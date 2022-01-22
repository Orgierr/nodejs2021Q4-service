import {
  Inject,
  Injectable,
  NestMiddleware,
  LoggerService,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly logger: LoggerService,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.debug({
      method: req.method,
      params: req['params'],
      url: req.url,
      query: req.query,
      body: req.body,
      responseCode: res.statusCode,
    });

    next();
  }
}
