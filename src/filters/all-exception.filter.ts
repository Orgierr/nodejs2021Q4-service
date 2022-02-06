import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ReasonPhrases } from 'http-status-codes';
import { Request } from 'express';
import { ExceptionResponse } from 'src/types/types';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    @Inject() private readonly httpAdapterHost: HttpAdapterHost,
    @Inject()
    private readonly logger: LoggerService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    if (exception instanceof HttpException) {
      const exceptionRes = exception.getResponse() as ExceptionResponse;

      httpAdapter.reply(
        ctx.getResponse(),
        exception.getResponse(),
        exception.getStatus(),
      );

      this.logger.warn({
        method: req.method,
        params: req.params,
        url: req.url,
        query: req.query,
        body: req.body,
        responseCode: exceptionRes.statusCode,
      });
    } else {
      httpAdapter.reply(
        ctx.getResponse(),
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ReasonPhrases.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

      this.logger.error({
        method: req.method,
        params: req.params,
        url: req.url,
        query: req.query,
        body: req.body,
        responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
        exception: exception,
      });
    }
  }
}
