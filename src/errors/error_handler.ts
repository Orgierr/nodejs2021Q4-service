import { ParameterizedContext, Next } from 'koa';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
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
      console.log('Exception caught');
      ctx.response.status = StatusCodes.INTERNAL_SERVER_ERROR;
      ctx.body = ReasonPhrases.INTERNAL_SERVER_ERROR;
      return;
    }
    return;
  }
}
