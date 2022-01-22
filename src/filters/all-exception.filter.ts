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
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    @Inject() private readonly httpAdapterHost: HttpAdapterHost,
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      message: exception.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);

    this.logger.error({
      method: req.method,
      params: req.params,
      url: req.url,
      query: req.query,
      body: req.body,
      responseCode: res.statusCode,
    });
  }
}
