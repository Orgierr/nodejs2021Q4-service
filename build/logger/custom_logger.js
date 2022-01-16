"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customLogger = void 0;
const winston_1 = __importDefault(require("winston"));
/**
 *
 *
 */
function customLogger() {
    return winston_1.default.createLogger({
        level: 'info',
        format: winston_1.default.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            //
            // - Write all logs with level `error` and below to `error.log`
            // - Write all logs with level `info` and below to `combined.log`
            //
            new winston_1.default.transports.File({
                filename: '../../log/error.log',
                level: 'error',
            }),
            new winston_1.default.transports.File({ filename: '../../log/combined.log' }),
        ],
    });
}
exports.customLogger = customLogger;
