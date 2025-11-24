import { prisma } from '@server/config';
import { CreateReminderInterface } from '@server/validations';
import {
  CreateReminderPrismaResponse,
  GetReminderPrismaResponse,
  GetReminderAPIResponse,
} from '@server/interfaces';
import { Priority, ReminderStatus } from '@/prisma-client/enums';
import { toCamelCase } from '@server/utils';
import { AllowedReminderStatus } from '@server/helpers';

export const addReminderDao = async ({
  title,
  description,
  userId,
  categoryId,
  status,
  priority,
  dueDate,
  remindAt,
}: CreateReminderInterface): Promise<CreateReminderPrismaResponse> => {
  const newReminder = await prisma.reminder.create({
    data: {
      title,
      description,
      user_id: userId,
      category_id: categoryId,
      status,
      priority,
      due_date: dueDate,
      remind_at: remindAt,
    },
    select: {
      uuid: true,
      title: true,
      description: true,
      status: true,
      priority: true,
      created_at: true,
    },
  });

  return newReminder;
};

export const getReminderByUuidDao = async (
  uuid: string
): Promise<GetReminderPrismaResponse | null> => {
  const reminder = await prisma.reminder.findFirst({
    where: {
      uuid,
    },

    select: {
      uuid: true,
      title: true,
      description: true,
      status: true,
      priority: true,
      created_at: true,
      updated_at: true,
    },
  });

  return reminder;
};

export const getAllRemindersDao = async (
  limit: number,
  offset: number
): Promise<{ reminders: GetReminderPrismaResponse[]; count: number }> => {
  const [allReminders, totalReminders] = await Promise.all([
    prisma.reminder.findMany({
      select: {
        uuid: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        created_at: true,
        updated_at: true,
      },
      orderBy: {
        created_at: 'asc',
      },
      take: limit,
      skip: offset,
    }),
    await prisma.reminder.count(),
  ]);

  return { reminders: allReminders, count: totalReminders };
};

export const updateReminderByUuidDao = async (
  reminderUuid: string,
  title?: string,
  description?: string,
  status?: ReminderStatus,
  priority?: Priority
): Promise<GetReminderAPIResponse> => {
  const updatedReminder = await prisma.reminder.update({
    where: {
      uuid: reminderUuid,
    },
    data: {
      ...(title && { title }),
      ...(description && { description }),
      ...(status && { status }),
      ...(priority && { priority }),
    },
    select: {
      uuid: true,
      title: true,
      description: true,
      status: true,
      priority: true,
      created_at: true,
      updated_at: true,
    },
  });

  return toCamelCase(updatedReminder);
};

export const updateReminderStatusByUuidDao = async (
  reminderUuid: string,
  status: AllowedReminderStatus
): Promise<GetReminderAPIResponse> => {
  const updatedReminder = await prisma.reminder.update({
    where: {
      uuid: reminderUuid,
    },
    data: {
      status,
      [status === ReminderStatus.COMPLETED ? 'completed_at' : 'deleted_at']:
        new Date().toISOString(),
    },
    select: {
      uuid: true,
      title: true,
      description: true,
      status: true,
      priority: true,
      created_at: true,
      updated_at: true,
    },
  });

  return toCamelCase(updatedReminder);
};
