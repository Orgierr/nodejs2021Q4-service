"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerHandler = void 0;
const logger_1 = require("../logger/logger");
/**
 *
 *
 * @param ctx - ParameterizedContext
 * @param  next - Next
 * @returns  Promise(void)
 */
async function loggerHandler(ctx, next) {
    logger_1.logger.http({
        method: ctx.method,
        params: ctx['params'],
        url: ctx.url,
        query: ctx.query,
        body: ctx.body,
        responseCode: ctx.response.status,
    });
    await next();
}
exports.loggerHandler = loggerHandler;
//# sourceMappingURL=logger_handler.js.map