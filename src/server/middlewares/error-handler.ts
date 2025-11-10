import { AppError } from '@server/utils';
import { NextFunction, Request, Response } from 'express';
import { logger } from '@server/config';

const globalErrorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(`Error on ${req.method} ${req.url} - ${err.message}`, {
    stack: err.stack,
    statusCode: (err as AppError).statusCode || 500,
  });

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};

export default globalErrorHandler;
