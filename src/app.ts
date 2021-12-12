import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { router as usersRouter } from './resources/users/user.router';
import { router as boardsRouter } from './resources/boards/board.router';
import { router as tasksRouter } from './resources/tasks/task.router';

export const app = new Koa();

app.use(bodyParser());
app.use(usersRouter.routes());
app.use(usersRouter.allowedMethods());
app.use(boardsRouter.routes());
app.use(boardsRouter.allowedMethods());
app.use(tasksRouter.routes());
app.use(tasksRouter.allowedMethods());

app.use(async (ctx, next) => {
  if (ctx.request.url === '/') {
    ctx.body = 'Service is running!';
  }
  await next();
});
