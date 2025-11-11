import { AppError } from '@server/utils';
import { NextFunction, Request, Response } from 'express';
import { logger } from '@server/config';
import { ApiResponseHandler } from '@server/utils';

const globalErrorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const message = err.message || 'Internal Server Error';
  const statusCode = (err as AppError).statusCode || 500;

  logger.error(`Error on ${req.method} ${req.url} - ${message}`, {
    stack: err.stack,
    statusCode,
  });

  ApiResponseHandler.error(res, message, statusCode, {
    code: err.name,
    details: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
  });
};

export default globalErrorHandler;
