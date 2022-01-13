import Router from 'koa-router';
import boardService from './board.service';
import { IdParamsType } from '../../types/types';
import { Board } from '../../typeorm/entitys/boards';
export const router = new Router();

router.get('/boards', async (ctx, next) => {
  const boards = await boardService.getAll();
  ctx.body = boards;
  await next();
});

router.get('/boards/:id', async (ctx, next) => {
  const params = <IdParamsType>ctx.params;

  const board = await boardService.getBoardById(params.id);
  if (board) {
    ctx.body = board;
    return;
  }
  ctx.response.status = 404;
  await next();
});

router.post('/boards', async (ctx, next) => {
  ctx.body = await boardService.createBoard(ctx.request.body as Board);
  ctx.response.status = 201;
  await next();
});

router.put('/boards/:id', async (ctx, next) => {
  const params = <IdParamsType>ctx.params;
  ctx.request.body.id = params.id;
  const board = await boardService.updateBoard(ctx.request.body);
  if (board) {
    ctx.body = board;
    return;
  }
  ctx.response.status = 404;
  await next();
});

router.delete('/boards/:id', async (ctx, next) => {
  const params = <IdParamsType>ctx.params;
  const result = await boardService.deleteBoardById(params.id);
  if (result.affected) {
    ctx.response.status = 204;
    return;
  }
  ctx.response.status = 404;
  await next();
});
