"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByLoginAndPassword = void 0;
const typeorm_1 = require("typeorm");
const users_1 = require("../../typeorm/entitys/users");
const password_hash_1 = require("../../utils/password_hash");
/**
 * Get user  by login and password
 * @returns user Promise(User | undefined)
 */
const getUserByLoginAndPassword = async (login, password) => await (0, typeorm_1.getRepository)(users_1.User).findOne({
    where: {
        login: login,
        password: await (0, password_hash_1.getPasswordHash)(password),
    },
});
exports.getUserByLoginAndPassword = getUserByLoginAndPassword;
//# sourceMappingURL=login.service.js.map