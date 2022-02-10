import * as winston from 'winston';
import { config } from './config';
import { utilities } from 'nest-winston';
export const winstonConfig = {
  level: config.LOG_LEVEL || 'debug',
  levels: {
    error: 0,
    warn: 1,
    verbose: 2,
    info: 3,
    debug: 4,
  },
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        utilities.format.nestLike(),
        winston.format.colorize({ all: true }),
      ),
    }),
    new winston.transports.File({ filename: 'logs/all.log' }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: 'logs/exceptions.log',
      level: 'error',
      handleExceptions: true,
      handleRejections: true,
    }),
  ],
};
