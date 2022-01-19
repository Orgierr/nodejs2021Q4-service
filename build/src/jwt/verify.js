"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../common/config");
const verify = (token) => jsonwebtoken_1.default.verify(token, String(config_1.config.JWT_SECRET_KEY));
exports.verify = verify;
//# sourceMappingURL=verify.js.map