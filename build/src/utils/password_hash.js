"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.getPasswordHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
async function getPasswordHash(password) {
    return await bcrypt_1.default.hash(password, 10);
}
exports.getPasswordHash = getPasswordHash;
async function checkPassword(hash, password) {
    return await bcrypt_1.default.compare(password, hash);
}
exports.checkPassword = checkPassword;
//# sourceMappingURL=password_hash.js.map