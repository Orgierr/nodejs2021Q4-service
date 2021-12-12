import Router from 'koa-router';
export const router = new Router();
import tasksService from './task.service';
import { Task } from './task.model';
import { TaskParamsType } from '../../types/types';

router.get('/boards/:boardId/tasks', async (ctx) => {
  const params = <TaskParamsType>ctx.params;
  const tasks = await tasksService.getAllTaskByBoardId(params.boardId);
  ctx.body = tasks.map((task) => task);
});

router.get('/boards/:boardId/tasks/:taskId', async (ctx) => {
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
});

router.post('/boards/:boardId/tasks', async (ctx) => {
  const params = <TaskParamsType>ctx.params;
  ctx.request.body.boardId = params.boardId;
  const task = new Task(ctx.request.body);
  await tasksService.createTasks(task);
  ctx.response.status = 201;
  ctx.body = task;
});

router.put('/boards/:boardId/tasks/:taskId', async (ctx) => {
  const params = <TaskParamsType>ctx.params;
  ctx.request.body.boardId = params.boardId;
  ctx.request.body.id = params.taskId;
  const task = await tasksService.updateTask(ctx.request.body);
  if (task) {
    ctx.body = task;
    return;
  }
  ctx.response.status = 404;
});

router.delete('/boards/:boardId/tasks/:taskId', async (ctx) => {
  const params = <TaskParamsType>ctx.params;
  const task = await tasksService.deleteTask(params.boardId, params.taskId);
  if (task.length) {
    ctx.response.status = 204;
    return;
  }
  ctx.response.status = 404;
});
