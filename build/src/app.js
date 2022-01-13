"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const user_router_1 = require("./resources/users/user.router");
const board_router_1 = require("./resources/boards/board.router");
const task_router_1 = require("./resources/tasks/task.router");
const error_handler_1 = require("./middleware/error_handler");
const logger_handler_1 = require("./middleware/logger_handler");
const logger_1 = require("./logger/logger");
require("./typeorm/connection");
exports.app = new koa_1.default();
exports.app.use(error_handler_1.errorHandler);
exports.app.use((0, koa_bodyparser_1.default)());
exports.app.use(user_router_1.router.routes());
exports.app.use(user_router_1.router.allowedMethods());
exports.app.use(board_router_1.router.routes());
exports.app.use(board_router_1.router.allowedMethods());
exports.app.use(task_router_1.router.routes());
exports.app.use(task_router_1.router.allowedMethods());
exports.app.use(async (ctx, next) => {
    if (ctx.request.url === '/') {
        ctx.body = 'Service is running!';
    }
    await next();
});
exports.app.use(logger_handler_1.loggerHandler);
process.on('uncaughtException', (err) => {
    logger_1.logger.error(err.stack ?? err.message, function () {
        logger_1.logger.end();
        process.exit(1);
    });
});
process.on('unhandledRejection', (err) => {
    throw err;
});
//# sourceMappingURL=app.js.map