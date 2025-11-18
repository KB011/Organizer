import { addReminderDao, getReminderByUuidDao } from '@server/dao';
import { CreateReminderInterface } from '@server/validations';
import { CreateReminderAPIResponse, GetReminderResponse } from '@server/interfaces';
import { logger } from '@server/config';
import { AppError } from '@server/utils';

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

export const getReminderByUuidService = async (uuid: string): Promise<GetReminderResponse> => {
  const reminder = await getReminderByUuidDao(uuid);
  if (!reminder) throw new AppError(404, `Reminder with UUID: ${uuid} does not exist`);
  return reminder;
};
