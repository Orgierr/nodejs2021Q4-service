"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const user_service_1 = __importDefault(require("./user.service"));
exports.router = new koa_router_1.default();
exports.router.get('/users', async (ctx, next) => {
    const users = await user_service_1.default.getAll();
    ctx.body = users;
    await next();
});
exports.router.get('/users/:id', async (ctx, next) => {
    const params = ctx.params;
    const user = await user_service_1.default.getUserById(params.id);
    if (user) {
        ctx.body = user;
        return;
    }
    ctx.response.status = 404;
    await next();
});
exports.router.post('/users', async (ctx, next) => {
    const body = ctx.request.body;
    const result = await user_service_1.default.createUser(body);
    ctx.response.status = 201;
    ctx.body = result;
    await next();
});
exports.router.put('/users/:id', async (ctx, next) => {
    const params = ctx.params;
    ctx.request.body.id = params.id;
    const user = await user_service_1.default.updateUser(ctx.request.body);
    if (user) {
        ctx.body = ctx.request.body;
        return;
    }
    ctx.response.status = 404;
    await next();
});
exports.router.delete('/users/:id', async (ctx, next) => {
    const params = ctx.params;
    const result = await user_service_1.default.deleteUserById(params.id);
    if (result.affected) {
        ctx.response.status = 204;
        return;
    }
    ctx.response.status = 404;
    await next();
});
//# sourceMappingURL=user.router.js.map