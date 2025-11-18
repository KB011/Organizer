import { prisma } from '@server/config';
import { CreateReminderInterface } from '@server/validations';
import { CreateReminderPrismaResponse } from '@server/interfaces';

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
