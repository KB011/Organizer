import { Priority, ReminderStatus } from '@/prisma-client/enums';

export interface CreateReminderPrismaResponse {
  uuid: string;
  title: string;
  description: string | null;
  status: ReminderStatus;
  priority: Priority;
  created_at: Date;
}

export interface CreateReminderAPIResponse {
  uuid: string;
  title: string;
  description: string | null;
  status: ReminderStatus;
  priority: Priority;
  createdAt: Date;
}

export interface GetReminderResponse {
  uuid: string;
  title: string;
  description: string | null;
  status: ReminderStatus;
  priority: Priority;
}
