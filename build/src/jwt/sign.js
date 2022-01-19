"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../common/config");
const sign = (payload) => jsonwebtoken_1.default.sign(payload, String(config_1.config.JWT_SECRET_KEY));
exports.sign = sign;
//# sourceMappingURL=sign.js.map