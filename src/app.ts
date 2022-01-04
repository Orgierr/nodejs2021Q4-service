import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { router as usersRouter } from './resources/users/user.router';
import { router as boardsRouter } from './resources/boards/board.router';
import { router as tasksRouter } from './resources/tasks/task.router';
import { errorHandler } from './middleware/error_handler';
import { loggerHandler } from './middleware/logger_handler';
import { logger } from './logger/logger';
import './typeorm/connection';
export const app = new Koa();

app.use(errorHandler);

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

app.use(loggerHandler);

process.on('uncaughtException', (err) => {
  logger.error(err.stack ?? err.message, function () {
    logger.end();
    process.exit(1);
  });
});

process.on('unhandledRejection', (err) => {
  throw err;
});
