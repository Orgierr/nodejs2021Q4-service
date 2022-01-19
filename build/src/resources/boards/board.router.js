"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const board_service_1 = __importDefault(require("./board.service"));
exports.router = new koa_router_1.default();
exports.router.get('/boards', async (ctx, next) => {
    const boards = await board_service_1.default.getAll();
    ctx.body = boards;
    await next();
});
exports.router.get('/boards/:id', async (ctx, next) => {
    const params = ctx.params;
    const board = await board_service_1.default.getBoardById(params.id);
    if (board) {
        ctx.body = board;
        return;
    }
    ctx.response.status = 404;
    await next();
});
exports.router.post('/boards', async (ctx, next) => {
    ctx.body = await board_service_1.default.createBoard(ctx.request.body);
    ctx.response.status = 201;
    await next();
});
exports.router.put('/boards/:id', async (ctx, next) => {
    const params = ctx.params;
    ctx.request.body.id = params.id;
    const board = await board_service_1.default.updateBoard(ctx.request.body);
    if (board) {
        ctx.body = board;
        return;
    }
    ctx.response.status = 404;
    await next();
});
exports.router.delete('/boards/:id', async (ctx, next) => {
    const params = ctx.params;
    const result = await board_service_1.default.deleteBoardById(params.id);
    if (result.affected) {
        ctx.response.status = 204;
        return;
    }
    ctx.response.status = 404;
    await next();
});
//# sourceMappingURL=board.router.js.map