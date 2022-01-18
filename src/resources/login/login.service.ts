import { getRepository } from 'typeorm';
import { User } from '../../typeorm/entitys/users';

/**
 * Get user  by login and password
 * @returns user Promise(User | undefined)
 */
export const getUserByLoginAndPassword = (
  login: string,
  password: string
): Promise<User | undefined> =>
  getRepository(User).findOne({
    where: {
      login: login,
      password: password,
    },
  });
