import * as winston from 'winston';
import { config } from './config';
export const winstonConfig = {
  level: config.LOG_LEVEL || 'debug',

  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    winston.format.printf(
      (info) => `${info['timestamp']} ${info.level}: ${info.message}`,
    ),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize({ all: true })),
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({ filename: 'logs/all.log' }),
  ],
};
