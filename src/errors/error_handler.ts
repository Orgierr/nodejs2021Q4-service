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
      logger.error('This is an error log');
      logger.warn('This is a warn log');
      logger.info('This is a info log');
      logger.http('This is a http log');
      logger.debug('This is a debug log');
      ctx.response.status = StatusCodes.INTERNAL_SERVER_ERROR;
      ctx.body = ReasonPhrases.INTERNAL_SERVER_ERROR;
      return;
    }
    return;
  }
}
