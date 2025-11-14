import { NextFunction, Request, Response } from 'express';

export default (
  controllerFn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(controllerFn(req, res, next)).catch(next);
  };
};
