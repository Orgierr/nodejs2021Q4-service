import { ParameterizedContext, Next } from 'koa';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
const allowedEndpoints = ['/login', '/doc', '/'];
export default async function auth(ctx: ParameterizedContext, next: Next) {
  if (!allowedEndpoints.includes(ctx.request.url)) {
    const token = ctx.headers.authorization;
    if (!token) {
      ctx.response.body = ReasonPhrases.UNAUTHORIZED;
      ctx.response.status = StatusCodes.UNAUTHORIZED;
      return;
    }
  }
  await next();
}
