import Router from 'koa-router';
export const router = new Router();
import tasksService from './task.service';
import { TaskParamsType } from '../../types/types';
import { Task } from '../../typeorm/entitys/tasks';

router.get('/boards/:boardId/tasks', async (ctx, next) => {
  const params = <TaskParamsType>ctx.params;
  const tasks = await tasksService.getAllTaskByBoardId(params.boardId);
  ctx.body = tasks;
  await next();
});

router.get('/boards/:boardId/tasks/:taskId', async (ctx, next) => {
  const params = <TaskParamsType>ctx.params;
  const task = await tasksService.getTaskByBoardIdAndTaskId(
    params.boardId,
    params.taskId
  );
  if (!task) {
    ctx.response.status = 404;
    return;
  }
  ctx.body = task;
  await next();
});

router.post('/boards/:boardId/tasks', async (ctx, next) => {
  const params = <TaskParamsType>ctx.params;
  ctx.request.body.boardId = params.boardId;
  const task = await tasksService.createTasks(ctx.request.body as Task);

  ctx.response.status = 201;
  ctx.body = task;

  await next();
});

router.put('/boards/:boardId/tasks/:taskId', async (ctx, next) => {
  const params = <TaskParamsType>ctx.params;
  ctx.request.body.boardId = params.boardId;
  ctx.request.body.id = params.taskId;
  const task = await tasksService.updateTask(ctx.request.body);
  if (task) {
    ctx.body = task;
    return;
  }
  ctx.response.status = 404;
  await next();
});

router.delete('/boards/:boardId/tasks/:taskId', async (ctx, next) => {
  const params = <TaskParamsType>ctx.params;
  const result = await tasksService.deleteTask(params.boardId, params.taskId);
  if (result.affected) {
    ctx.response.status = 204;
    return;
  }
  ctx.response.status = 404;
  await next();
});
