import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const start = Date.now();

    const message = `${method} ${originalUrl}`;

    res.on('finish', () => {
      const responseTime = Date.now() - start;
      const statusCode = res.statusCode;

      this.loggerService.log(message, {
        ip,
        statusCode,
        responseTime,
      });
    });

    next();
  }
}
