"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const logger_1 = require("../logger/logger");
/**
 *
 *
 * @param ctx - ParameterizedContext
 * @param  next - Next
 * @returns  Promise(string | undefined)
 */
async function errorHandler(ctx, next) {
    try {
        await next();
        return;
    }
    catch (error) {
        const err = error;
        if (err) {
            ctx.response.status = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
            ctx.body = http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR;
            logger_1.logger.error({
                method: ctx.method,
                params: ctx['params'],
                url: ctx.url,
                query: ctx.query,
                body: ctx.body,
                responseCode: ctx.response.status,
                stack: err.stack,
            });
            return;
        }
        return;
    }
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=error_handler.js.map