import { Injectable } from '@nestjs/common';
import { LoggerService as NestLoggerService } from '@nestjs/common';
import * as winston from 'winston';
import * as path from 'path';

@Injectable()
export class LoggerService implements NestLoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
        new winston.transports.File({
          filename: path.join(__dirname, '..', '..', 'logs', 'app.log'),
          level: 'info',
          format: winston.format.json(),
        }),
      ],
    });
  }

  log(message: any, infoObject?: object) {
    this.logger.info(message, infoObject);
  }

  error(message: any) {
    this.logger.error(message);
  }

  warn(message: any) {
    this.logger.warn(message);
  }

  debug(message: any) {
    this.logger.debug(message);
  }
}
