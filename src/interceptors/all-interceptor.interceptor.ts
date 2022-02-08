import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  LoggerService,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Response, Request } from 'express';
@Injectable()
export class AllInterceptorInterceptor implements NestInterceptor {
  constructor(
    @Inject(Logger)
    private readonly logger: LoggerService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      tap(() =>
        this.logger.debug?.({
          method: req.method,
          params: req.params,
          url: req.originalUrl,
          query: req.query,
          body: req.body,
          responseCode: res.statusCode,
        }),
      ),
    );
  }
}
