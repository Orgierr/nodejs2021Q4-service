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
import { ExeptionResponse } from 'src/types/types';

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
    const exeptionRes = exception.getResponse() as ExeptionResponse;
    if (exception instanceof HttpException) {
      this.logger.warn({
        method: req.method,
        params: req.params,
        url: req.url,
        query: req.query,
        body: req.body,
        responseCode: exeptionRes.statusCode,
      });

      httpAdapter.reply(
        ctx.getResponse(),
        exception.getResponse(),
        exception.getStatus(),
      );
    } else {
      this.logger.error({
        method: req.method,
        params: req.params,
        url: req.url,
        query: req.query,
        body: req.body,
        responseCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
      httpAdapter.reply(
        ctx.getResponse(),
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: ReasonPhrases.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
