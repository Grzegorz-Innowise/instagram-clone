import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { Response, Request } from 'express';
import { LoggerService } from '../logger/logger.service';

type ResponseBody = {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
};

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(
    private readonly loggerService: LoggerService,
    readonly httpAdapterHost: HttpAdapterHost,
  ) {
    super(httpAdapterHost.httpAdapter);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const responseBody: ResponseBody = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: '',
    };

    if (exception instanceof HttpException) {
      responseBody.statusCode = exception.getStatus();
      responseBody.response = exception.getResponse();
    } else {
      responseBody.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      responseBody.response = 'Internal server error';
    }

    const errMessage =
      typeof responseBody.response === 'string'
        ? responseBody.response
        : responseBody.response && 'message' in responseBody.response
          ? (responseBody.response as { message: string }).message
          : 'Unknown error';

    response.status(responseBody.statusCode).json(responseBody);
    this.loggerService.error(errMessage);

    super.catch(exception, host);
  }
}
