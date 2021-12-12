import Router from 'koa-router';
import boardService from './board.service';
import { Board } from './board.model';
import { IdParamsType } from '../../types/types';
export const router = new Router();

router.get('/boards', async (ctx) => {
  const boards = await boardService.getAll();
  ctx.body = boards;
});

router.get('/boards/:id', async (ctx) => {
  const params = <IdParamsType>ctx.params;

  const board = boardService.getBoardById(params.id);
  if (board) {
    ctx.body = board;
    return;
  }
  ctx.response.status = 404;
});

router.post('/boards', async (ctx) => {
  const board = new Board(ctx.request.body);
  await boardService.createBoard(board);
  ctx.response.status = 201;
  ctx.body = board;
});

router.put('/boards/:id', async (ctx) => {
  const params = <IdParamsType>ctx.params;
  ctx.request.body.id = params.id;
  const board = await boardService.updateBoard(ctx.request.body);
  if (board) {
    ctx.body = board;
    return;
  }
  ctx.response.status = 404;
});

router.delete('/boards/:id', async (ctx) => {
  const params = <IdParamsType>ctx.params;
  const board = await boardService.deleteBoardById(params.id);
  if (board.length) {
    ctx.response.status = 204;
    return;
  }
  ctx.response.status = 404;
});
