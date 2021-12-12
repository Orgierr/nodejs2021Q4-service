"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_memory_repository_1 = require("./user.memory.repository");
const task_memory_repository_1 = require("../tasks/task.memory.repository");
/**
 *Get all users
 *@returns all users (Users[])
 */
const getAll = () => user_memory_repository_1.usersRepo;
/**
 * Add new user in db
 * @param user - new user (User)
 * @returns user index (number)
 */
const createUser = (user) => user_memory_repository_1.usersRepo.push(user);
/**
 * Get user by id
 * @param  id - user id (string)
 * @returns user by id  (User | undefined)
 */
const getUserById = (id) => {
    const user = user_memory_repository_1.usersRepo.find((u) => u.id === id);
    return user;
};
/**
 * Delete user by id
 * @param id - user id (string)
 * @returns array deleted users (User[])
 */
const deleteUserById = (id) => {
    const userIndex = user_memory_repository_1.usersRepo.findIndex((u) => u.id === id);
    if (userIndex !== -1) {
        for (const task of task_memory_repository_1.tasksRepo) {
            if (task.userId === id) {
                task.userId = null;
            }
        }
        return user_memory_repository_1.usersRepo.splice(userIndex, 1);
    }
    return [];
};
/**
 * Update user
 * @param  updatedUser - new user data (User)
 * @returns new user data (User|undefined)
 */
const updateUser = (updatedUser) => {
    const userIndex = user_memory_repository_1.usersRepo.findIndex((u) => u.id === updatedUser.id);
    if (userIndex !== -1) {
        user_memory_repository_1.usersRepo[userIndex] = updatedUser;
        return updatedUser;
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
