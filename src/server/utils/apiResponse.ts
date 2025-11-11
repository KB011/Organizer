import { Response } from 'express';

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    code: string;
    details?: any;
  };
  meta?: Record<string, any>;
}

export class ApiResponseHandler {
  static success<T>(res: Response, message: string, data?: T, meta?: Record<string, any>) {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
      ...(meta && { meta }),
    };

    res.status(200).json(response);
  }

  static created<T>(res: Response, message: string, data?: T) {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
    };

    res.status(201).json(response);
  }

  static error(
    res: Response,
    message: string,
    statusCode: number,
    error: { code: string; details?: any }
  ) {
    const response: ApiResponse = {
      success: false,
      message,
      error,
    };

    res.status(statusCode).json(response);
  }
}
