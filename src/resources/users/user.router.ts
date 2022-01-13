import Router from 'koa-router';
import { User } from '../../typeorm/entitys/users';
import { IdParamsType } from '../../types/types';
import usersService from './user.service';
export const router = new Router();

router.get('/users', async (ctx, next) => {
  const users = await usersService.getAll();
  ctx.body = users;
  await next();
});

router.get('/users/:id', async (ctx, next) => {
  const params = <IdParamsType>ctx.params;
  const user: User | undefined = await usersService.getUserById(params.id);
  if (user) {
    ctx.body = user;
    return;
  }
  ctx.response.status = 404;
  await next();
});
router.post('/users', async (ctx, next) => {
  const body = <User>ctx.request.body;
  const result = await usersService.createUser(body);
  ctx.response.status = 201;
  ctx.body = result;
  await next();
});

router.put('/users/:id', async (ctx, next) => {
  const params = <IdParamsType>ctx.params;
  ctx.request.body.id = params.id;
  const user = await usersService.updateUser(ctx.request.body);
  if (user) {
    ctx.body = ctx.request.body;
    return;
  }
  ctx.response.status = 404;
  await next();
});

router.delete('/users/:id', async (ctx, next) => {
  const params = <IdParamsType>ctx.params;
  const result = await usersService.deleteUserById(params.id);
  if (result.affected) {
    ctx.response.status = 204;
    return;
  }
  ctx.response.status = 404;
  await next();
});
