"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
exports.router = new koa_router_1.default();
const task_service_1 = __importDefault(require("./task.service"));
exports.router.get('/boards/:boardId/tasks', async (ctx, next) => {
    const params = ctx.params;
    const tasks = await task_service_1.default.getAllTaskByBoardId(params.boardId);
    ctx.body = tasks;
    await next();
});
exports.router.get('/boards/:boardId/tasks/:taskId', async (ctx, next) => {
    const params = ctx.params;
    const task = await task_service_1.default.getTaskByBoardIdAndTaskId(params.boardId, params.taskId);
    if (!task) {
        ctx.response.status = 404;
        return;
    }
    ctx.body = task;
    await next();
});
exports.router.post('/boards/:boardId/tasks', async (ctx, next) => {
    const params = ctx.params;
    ctx.request.body.boardId = params.boardId;
    const task = await task_service_1.default.createTasks(ctx.request.body);
    ctx.response.status = 201;
    ctx.body = task;
    await next();
});
exports.router.put('/boards/:boardId/tasks/:taskId', async (ctx, next) => {
    const params = ctx.params;
    ctx.request.body.boardId = params.boardId;
    ctx.request.body.id = params.taskId;
    const task = await task_service_1.default.updateTask(ctx.request.body);
    if (task) {
        ctx.body = task;
        return;
    }
    ctx.response.status = 404;
    await next();
});
exports.router.delete('/boards/:boardId/tasks/:taskId', async (ctx, next) => {
    const params = ctx.params;
    const result = await task_service_1.default.deleteTask(params.boardId, params.taskId);
    if (result.affected) {
        ctx.response.status = 204;
        return;
    }
    ctx.response.status = 404;
    await next();
});
//# sourceMappingURL=task.router.js.map