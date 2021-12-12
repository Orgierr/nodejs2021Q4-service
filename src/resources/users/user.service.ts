import { usersRepo } from './user.memory.repository';
import { tasksRepo } from '../tasks/task.memory.repository';
import { User } from './user.model';
/**
 *Get all users
 *@returns all users (Users[])
 */
const getAll = (): User[] => usersRepo;
/**
 * Add new user in db
 * @param user - new user (User)
 * @returns user index (number)
 */
const createUser = (user: User): number => usersRepo.push(user);
/**
 * Get user by id
 * @param  id - user id (string)
 * @returns user by id  (User | undefined)
 */
const getUserById = (id: string): User | undefined => {
  const user = usersRepo.find((u) => u.id === id);
  return user;
};
/**
 * Delete user by id
 * @param id - user id (string)
 * @returns array deleted users (User[])
 */
const deleteUserById = (id: string): User[] => {
  const userIndex = usersRepo.findIndex((u) => u.id === id);
  if (userIndex !== -1) {
    for (const task of tasksRepo) {
      if (task.userId === id) {
        task.userId = null;
      }
    }

    return usersRepo.splice(userIndex, 1);
  }
  return [];
};
/**
 * Update user
 * @param  updatedUser - new user data (User)
 * @returns new user data (User|undefined)
 */
const updateUser = (updatedUser: User): User | undefined => {
  const userIndex = usersRepo.findIndex((u) => u.id === updatedUser.id);
  if (userIndex !== -1) {
    usersRepo[userIndex] = updatedUser;
    return updatedUser;
  }
  return undefined;
};

export default {
  getAll,
  createUser,
  getUserById,
  updateUser,
  deleteUserById,
};
