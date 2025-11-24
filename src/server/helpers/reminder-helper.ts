import { ReminderStatus } from '@/prisma-client/enums';

const allowedReminderStatusTuple = [ReminderStatus.COMPLETED, ReminderStatus.DELETED] as const;
export type AllowedReminderStatus = (typeof allowedReminderStatusTuple)[number];

export const isAllowedStatusTypeGuard = (status: any): status is AllowedReminderStatus => {
  return allowedReminderStatusTuple.includes(status);
};
