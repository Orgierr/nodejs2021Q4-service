"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const custom_logger_1 = require("../logger/custom_logger");
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
            (0, custom_logger_1.customLogger)().error('Exception caught');
            ctx.response.status = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
            ctx.body = http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR;
            return;
        }
        return;
    }
}
exports.errorHandler = errorHandler;
