import { getRepository } from 'typeorm';
import { User } from '../../typeorm/entitys/users';
import { getPasswordHash } from '../../utils/password_hash';

/**
 * Get user  by login and password
 * @returns user Promise(User | undefined)
 */
export const getUserByLoginAndPassword = async (
  login: string,
  password: string
): Promise<User | undefined> =>
  await getRepository(User).findOne({
    where: {
      login: login,
      password: await getPasswordHash(password),
    },
  });
