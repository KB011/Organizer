import * as z from 'zod';
import { Priority, ReminderStatus } from '@/prisma-client/enums';

const reminderSchemaFields = {
  title: z
    .string('Reminder title must be a string')
    .min(2, 'Reminder title must have atleast 2 characters')
    .max(20, 'Reminder title cannot exceed 20 characters')
    .trim(),
  description: z
    .string('Reminder description must be a string')
    .min(2, 'Reminder description must have atleast 2 characters')
    .max(100, 'Reminder description cannot exceed 100 characters')
    .trim(),
  status: z.enum(
    ReminderStatus,
    'Reminder status is restricted to following values:   ACTIVE, ARCHIVED, COMPLETED, DELETED'
  ),
  priority: z.enum(
    Priority,
    'Reminder Priority is restricted to following values: LOW, MEDIUM, URGENT, CRITICAL'
  ),
};

export const CreateReminderSchema = z.object({
  title: reminderSchemaFields.title,
  description: reminderSchemaFields.description.optional(),
  userId: z.number().optional(),
  categoryId: z.number().optional(),
  status: reminderSchemaFields.status.optional(),
  priority: reminderSchemaFields.priority.optional(),
  dueDate: z.date().optional(),
  remindAt: z.date().optional(),
  completedAt: z.date().optional(),
  deletedAt: z.date().optional(),
});

export const GetAllRemindersQuerySchema = z.object({
  limit: z.coerce
    .number('Pagination limit must be a number')
    .min(0, 'Pagination limit cannot be lesser than zero.'),
  offset: z.coerce
    .number('Pagination offset must be a number')
    .min(0, 'Pagination offset cannot be lesser than zero.'),
});

export const UpdateReminderSchema = z.object({
  title: reminderSchemaFields.title.optional(),
  description: reminderSchemaFields.description.optional(),
  status: reminderSchemaFields.status.optional(),
  priority: reminderSchemaFields.priority.optional(),
});

export type CreateReminderInterface = z.infer<typeof CreateReminderSchema>;
export type UpdateReminderInterface = z.infer<typeof UpdateReminderSchema>;
