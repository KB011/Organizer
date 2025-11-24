import {
  addReminderDao,
  getAllRemindersDao,
  getReminderByUuidDao,
  updateReminderByUuidDao,
  updateReminderStatusByUuidDao,
} from '@server/dao';
import { CreateReminderInterface, UpdateReminderInterface } from '@server/validations';
import { CreateReminderAPIResponse, GetReminderAPIResponse } from '@server/interfaces';
import { logger } from '@server/config';
import { AppError } from '@server/utils';
import { isAllowedStatusTypeGuard } from '../helpers';

export const addReminderService = async (
  reminderPayload: CreateReminderInterface
): Promise<CreateReminderAPIResponse> => {
  logger.debug(`Creating new Reminder with payload: ${JSON.stringify(reminderPayload)}`);

  const {
    uuid,
    title,
    description,
    status,
    priority,
    created_at: createdAt,
  } = await addReminderDao(reminderPayload);

  const response = { uuid, title, description, status, priority, createdAt };
  return response;
};

export const getReminderByUuidService = async (
  reminderUuid: string
): Promise<GetReminderAPIResponse> => {
  const reminder = await getReminderByUuidDao(reminderUuid);
  if (!reminder) throw new AppError(404, `Reminder with UUID: ${reminderUuid} does not exist`);

  const {
    uuid,
    title,
    description,
    status,
    priority,
    created_at: createdAt,
    updated_at: updatedAt,
  } = reminder;

  const response = {
    uuid,
    title,
    description,
    status,
    priority,
    createdAt,
    updatedAt,
  };
  return response;
};

export const getAllRemindersService = async (
  limit: number,
  offset: number
): Promise<{ reminders: GetReminderAPIResponse[]; count: number }> => {
  const { reminders, count } = await getAllRemindersDao(limit, offset);
  const remindersResponse = reminders.map(reminder => ({
    uuid: reminder.uuid,
    title: reminder.title,
    description: reminder.description,
    status: reminder.status,
    priority: reminder.priority,
    createdAt: reminder.created_at,
    updatedAt: reminder.updated_at,
  }));

  return { reminders: remindersResponse, count };
};

export const updateReminderByUuidService = async (
  reminderUuid: string,
  payload: UpdateReminderInterface
): Promise<GetReminderAPIResponse | void> => {
  let updatedReminder: GetReminderAPIResponse;
  const { title, description, priority, status } = payload;
  if (isAllowedStatusTypeGuard(status)) {
    updatedReminder = await updateReminderStatusByUuidDao(reminderUuid, status);
  } else {
    updatedReminder = await updateReminderByUuidDao(
      reminderUuid,
      title,
      description,
      status,
      priority
    );
  }
  return updatedReminder;
};
