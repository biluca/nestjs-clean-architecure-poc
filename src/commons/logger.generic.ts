// custom-logger.service.ts
import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
const { combine, colorize, timestamp, align, printf } = winston.format;

const alignedWithColorsAndTime = combine(
  colorize(),
  timestamp(),
  align(),
  printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: alignedWithColorsAndTime,
  transports: [new winston.transports.Console()],
});

@Injectable()
export class GenericLogger implements LoggerService {
  log(message: string) {
    logger.info(message);
  }

  info(message: string): void {
    logger.info(message);
  }

  error(message: string): void {
    logger.error(message);
  }

  warn(message: string): void {
    logger.warn(message);
  }

  debug(message: string): void {
    logger.debug(message);
  }
}
