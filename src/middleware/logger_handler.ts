import { ParameterizedContext, Next } from 'koa';
import { logger } from '../logger/logger';
/**
 *
 *
 * @param ctx - ParameterizedContext
 * @param  next - Next
 * @returns  Promise(string | undefined)
 */
export async function loggerHandler(ctx: ParameterizedContext, next: Next) {
  logger.http({
    url: ctx.url,
    query: ctx.query,
    body: ctx.body,
    responseCode: ctx.response.status,
  });
  await next();
}
