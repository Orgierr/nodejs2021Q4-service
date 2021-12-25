import { ParameterizedContext, Next } from 'koa';
import { logger } from '../logger/logger';
/**
 *
 *
 * @param ctx - ParameterizedContext
 * @param  next - Next
 * @returns  Promise(void)
 */
export async function loggerHandler(ctx: ParameterizedContext, next: Next) {
  logger.http({
    method: ctx.method,
    params: ctx['params'],
    url: ctx.url,
    query: ctx.query,
    body: ctx.body,
    responseCode: ctx.response.status,
  });
  await next();
}
