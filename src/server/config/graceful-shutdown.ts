import { Server } from 'node:http';
import { prisma } from '@server/config';

export default async (signal: string, server: Server): Promise<void> => {
  console.log(`Closing HTTP server after receiving signal - ${signal}`);

  server.close(async () => {
    console.log('HTTP server closed successfully!!');

    try {
      await prisma.$disconnect();
      console.log('Prisma singleton client connection closed successfully!');
    } catch (err: any) {
      console.log(`Unable to close Prisma singleton client connection due to ${err?.message}`);
      console.log(JSON.stringify(err));
    } finally {
      process.exit(0);
    }
  });
};
