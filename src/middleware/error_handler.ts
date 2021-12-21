import { ParameterizedContext, Next } from 'koa';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { logger } from '../logger/logger';
/**
 *
 *
 * @param ctx - ParameterizedContext
 * @param  next - Next
 * @returns  Promise(string | undefined)
 */
export async function errorHandler(ctx: ParameterizedContext, next: Next) {
  try {
    await next();
    return;
  } catch (error) {
    const err = error as Error;
    if (err) {
      ctx.response.status = StatusCodes.INTERNAL_SERVER_ERROR;
      ctx.body = ReasonPhrases.INTERNAL_SERVER_ERROR;

      logger.error({
        url: ctx.url,
        query: ctx.query,
        body: ctx.body,
        status: ctx.response.status,
        stack: err.stack,
      });

      return;
    }
    return;
  }
}
