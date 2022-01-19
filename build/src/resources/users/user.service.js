"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const users_1 = require("../../typeorm/entitys/users");
const password_hash_1 = require("../../utils/password_hash");
const returnedColumn = ['id', 'login', 'name'];
/**
 *Get all users
 *@returns all users Promise(Users[])
 */
const getAll = () => (0, typeorm_1.getRepository)(users_1.User).find({ select: returnedColumn });
/**
 * Add new user in db
 * @param user - new user (User)
 * @returns user to response Promise(User.toResponse)
 */
const createUser = async (user) => {
    user.password = await (0, password_hash_1.getPasswordHash)(user.password);
    return users_1.User.toResponse(await (0, typeorm_1.getRepository)(users_1.User).save(user));
};
/**
 * Get user by id
 * @param  id - user id (string)
 * @returns user by id  Promise(User | undefined)
 */
const getUserById = (id) => {
    return (0, typeorm_1.getRepository)(users_1.User).findOne({
        select: returnedColumn,
        where: { id: id },
    });
};
/**
 * Delete user by id
 * @param id - user id (string)
 * @returns  deleted result Promise(DeleteResult)
 */
const deleteUserById = async (id) => {
    return (0, typeorm_1.getRepository)(users_1.User).delete({ id: id });
};
/**
 * Update user
 * @param  updatedUser - new user data (User)
 * @returns  user to response Promise(User.toResponse|undefined)
 */
const updateUser = async (updatedUser) => {
    updatedUser.password = await (0, password_hash_1.getPasswordHash)(updatedUser.password);
    const result = await (0, typeorm_1.getRepository)(users_1.User).update(updatedUser.id, updatedUser);
    if (result.affected) {
        return users_1.User.toResponse(updatedUser);
    }
    return undefined;
};
exports.default = {
    getAll,
    createUser,
    getUserById,
    updateUser,
    deleteUserById,
};
//# sourceMappingURL=user.service.js.map