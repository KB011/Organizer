import { Request, Response } from 'express';
import { CreateReminderSchema } from '@server/validations';
import { addReminderService, getReminderByUuidService } from '@server/services';
import { ApiResponseHandler, AppError } from '@server/utils';
import { CreateReminderAPIResponse, GetReminderAPIResponse } from '@server/interfaces';

export const addReminderController = async (req: Request, res: Response): Promise<void> => {
  const { data, error } = CreateReminderSchema.safeParse(req.body);

  if (!data) throw new AppError(400, error.message);

  const response: CreateReminderAPIResponse = await addReminderService(data);
  ApiResponseHandler.created(res, 'Reminder created successfully!', response);
};

export const getReminderByUuidController = async (req: Request, res: Response): Promise<void> => {
  const uuid = req.params.uuid;
  const response: GetReminderAPIResponse = await getReminderByUuidService(uuid);

  ApiResponseHandler.success(res, 'Reminder fetched successfully!', response);
};
