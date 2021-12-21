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
      logger.error(
        ctx.url,
        ctx.query,
        ctx.body,
        ctx.response.status,
        err.message,
        err.stack
      );
      return;
    }
    return;
  }
}
