// tslint:disable: typedef
import { NextFunction, Request, Response } from 'express';
import expressWinston from 'express-winston';
import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports: [new winston.transports.Console()]
});

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');
export const requestLogger = function log_RequestLogger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return expressWinston.logger({
    expressFormat: true,
    winstonInstance: logger
  })(req, res, next);
};

export const errorLogger = function log_ErrorLogger(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return expressWinston.errorLogger({
    winstonInstance: logger
  })(err, req, res, next);
};

logger.info('Logging is on.');