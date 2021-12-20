import Router from 'koa-router';
import { IdParamsType } from '../../types/types';
import { User } from './user.model';
import usersService from './user.service';

export const router = new Router();

router.get('/users', async (ctx) => {
  throw new Error('sdfsddf');

  const users = await usersService.getAll();
  ctx.body = users.map(User.toResponse);
});

router.get('/users/:id', async (ctx) => {
  const params = <IdParamsType>ctx.params;
  const user = usersService.getUserById(params.id);
  if (user) {
    ctx.body = User.toResponse(user);
    return;
  }
  ctx.response.status = 404;
});

router.post('/users', async (ctx) => {
  const body = <User>ctx.request.body;
  const user = new User(body);
  await usersService.createUser(user);
  ctx.response.status = 201;
  ctx.body = User.toResponse(user);
});

router.put('/users/:id', async (ctx) => {
  const params = <IdParamsType>ctx.params;
  ctx.request.body.id = params.id;

  const user = await usersService.updateUser(ctx.request.body);
  if (user?.id) {
    ctx.body = User.toResponse(user);
    return;
  }
  ctx.response.status = 404;
});

router.delete('/users/:id', async (ctx) => {
  const params = <IdParamsType>ctx.params;
  const user = await usersService.deleteUserById(params.id);
  if (user.length) {
    ctx.response.status = 204;
    return;
  }
  ctx.response.status = 404;
});
