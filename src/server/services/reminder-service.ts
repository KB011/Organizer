import { addReminderDao } from '../dao';
import { CreateReminderInterface } from '@server/validations';
import { CreateReminderAPIResponse } from '@server/interfaces';
import { logger } from '@server/config';

export const addReminderService = async (
  reminderPayload: CreateReminderInterface
): Promise<CreateReminderAPIResponse> => {
  logger.debug(`Creating new Reminder with payload: ${JSON.stringify(reminderPayload)}`);

  const { uuid, created_at: createdAt } = await addReminderDao(reminderPayload);
  const response = { uuid, createdAt };
  return response;
};
