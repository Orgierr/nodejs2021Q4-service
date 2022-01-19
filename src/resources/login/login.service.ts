import { getRepository } from 'typeorm';
import { User } from '../../typeorm/entitys/users';
import { checkPassword } from '../../utils/password_hash';

/**
 * Get user  by login
 * @returns user Promise(User | undefined)
 */
export const getUserByLoginAndPassword = async (
  login: string,
  password: string
): Promise<User | undefined> => {
  const user = await getRepository(User).findOne({
    where: {
      login: login,
    },
  });

  if (user) {
    const isPassword = await checkPassword(user.password, password);
    if (!isPassword) {
      return undefined;
    }
  }
  return user;
};
