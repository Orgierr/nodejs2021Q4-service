"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const user_model_1 = require("./user.model");
const user_service_1 = __importDefault(require("./user.service"));
exports.router = new koa_router_1.default();
exports.router.get('/users', async (ctx) => {
    const users = await user_service_1.default.getAll();
    ctx.body = users.map(user_model_1.User.toResponse);
});
exports.router.get('/users/:id', async (ctx) => {
    const params = ctx.params;
    const user = user_service_1.default.getUserById(params.id);
    if (user) {
        ctx.body = user_model_1.User.toResponse(user);
        return;
    }
    ctx.response.status = 404;
});
exports.router.post('/users', async (ctx) => {
    const body = ctx.request.body;
    const user = new user_model_1.User(body);
    await user_service_1.default.createUser(user);
    ctx.response.status = 201;
    ctx.body = user_model_1.User.toResponse(user);
});
exports.router.put('/users/:id', async (ctx) => {
    const params = ctx.params;
    ctx.request.body.id = params.id;
    const user = await user_service_1.default.updateUser(ctx.request.body);
    if (user?.id) {
        ctx.body = user_model_1.User.toResponse(user);
        return;
    }
    ctx.response.status = 404;
});
exports.router.delete('/users/:id', async (ctx) => {
    const params = ctx.params;
    const user = await user_service_1.default.deleteUserById(params.id);
    if (user.length) {
        ctx.response.status = 204;
        return;
    }
    ctx.response.status = 404;
});
