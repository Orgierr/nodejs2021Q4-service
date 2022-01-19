import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import Router from 'koa-router';
import { sign } from '../../jwt/sign';
import { UserAuthType } from '../../types/types';
import { getUserByLoginAndPassword } from './login.service';
export const router = new Router();

router.post('/login', async (ctx, next) => {
  const { login, password }: UserAuthType = ctx.request.body;
  const user = await getUserByLoginAndPassword(login, password);
  if (user) {
    const token = sign({ userId: user.id, login: user.login });
    ctx.body = { token: token };
    return;
  }
  ctx.response.status = StatusCodes.FORBIDDEN;
  ctx.body = ReasonPhrases.FORBIDDEN;
  await next();
});
