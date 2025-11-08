import winston from 'winston';
import path from 'path';

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: () => new Date().toISOString() }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.printf(
    ({ level, message, timestamp, stack }) =>
      `${timestamp} [${level.toUpperCase()}]: ${stack || message}`
  )
);

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(winston.format.colorize(), logFormat),
  }),

  new winston.transports.File({
    filename: path.join('logs', 'combined.log'),
    level: 'info',
    format: winston.format.combine(winston.format.json()),
    maxsize: 10 * 1024 * 1024,
    maxFiles: 5,
  }),

  new winston.transports.File({
    filename: path.join('logs', 'error.log'),
    level: 'error',
    format: winston.format.combine(winston.format.json()),
  }),
];

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: logFormat,
  transports,
  exitOnError: false,
});

export default logger;
