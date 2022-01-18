import { DeleteResult, getRepository } from 'typeorm';
import { User } from '../../typeorm/entitys/users';
import { getPasswordHash } from '../../utils/password_hash';
const returnedColumn: (keyof User)[] = ['id', 'login', 'name'];

/**
 *Get all users
 *@returns all users Promise(Users[])
 */
const getAll = (): Promise<User[]> =>
  getRepository(User).find({ select: returnedColumn });

/**
 * Add new user in db
 * @param user - new user (User)
 * @returns user to response Promise(User.toResponse)
 */
const createUser = async (user: User) => {
  user.password = await getPasswordHash(user.password);
  return User.toResponse(await getRepository(User).save(user));
};
/**
 * Get user by id
 * @param  id - user id (string)
 * @returns user by id  Promise(User | undefined)
 */
const getUserById = (id: string): Promise<User | undefined> => {
  return getRepository(User).findOne({
    select: returnedColumn,
    where: { id: id },
  });
};
/**
 * Delete user by id
 * @param id - user id (string)
 * @returns  deleted result Promise(DeleteResult)
 */
const deleteUserById = async (id: string): Promise<DeleteResult> => {
  return getRepository(User).delete({ id: id });
};
/**
 * Update user
 * @param  updatedUser - new user data (User)
 * @returns  user to response Promise(User.toResponse|undefined)
 */
const updateUser = async (updatedUser: User) => {
  updatedUser.password = await getPasswordHash(updatedUser.password);
  const result = await getRepository(User).update(updatedUser.id, updatedUser);
  if (result.affected) {
    return User.toResponse(updatedUser);
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
