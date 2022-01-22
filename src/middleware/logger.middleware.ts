import {
  Inject,
  Injectable,
  NestMiddleware,
  LoggerService,
  Logger,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(Logger)
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
