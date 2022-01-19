"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const http_status_codes_1 = require("http-status-codes");
const koa_router_1 = __importDefault(require("koa-router"));
const sign_1 = require("../../jwt/sign");
const login_service_1 = require("./login.service");
exports.router = new koa_router_1.default();
exports.router.post('/login', async (ctx, next) => {
    const { login, password } = ctx.request.body;
    const user = await (0, login_service_1.getUserByLoginAndPassword)(login, password);
    if (user) {
        const token = (0, sign_1.sign)({ userId: user.id, login: user.login });
        ctx.body = { token: token };
        return;
    }
    ctx.response.status = http_status_codes_1.StatusCodes.FORBIDDEN;
    ctx.body = http_status_codes_1.ReasonPhrases.FORBIDDEN;
    await next();
});
//# sourceMappingURL=login.router.js.map