import { PrismaClient } from '@/prisma-client/client';

const globalThisForPrisma = globalThis as unknown as { prismaSingleton: PrismaClient | undefined };

export const prisma =
  globalThisForPrisma.prismaSingleton ??
  new PrismaClient({ log: ['info', 'query', 'warn', 'error'] });

if (process.env.NODE_ENV !== 'production') globalThisForPrisma.prismaSingleton = prisma;
