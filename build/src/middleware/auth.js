"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const allowedEndpoints = ['/login', '/doc', '/'];
async function auth(ctx, next) {
    if (!allowedEndpoints.includes(ctx.request.url)) {
        const token = ctx.headers.authorization;
        if (!token) {
            ctx.response.body = http_status_codes_1.ReasonPhrases.UNAUTHORIZED;
            ctx.response.status = http_status_codes_1.StatusCodes.UNAUTHORIZED;
            return;
        }
    }
    await next();
}
exports.default = auth;
//# sourceMappingURL=auth.js.map