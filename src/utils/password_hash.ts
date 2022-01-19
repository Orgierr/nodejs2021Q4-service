import bcrypt from 'bcrypt';

/**
 * Generate bcrypt hash from user password
 * @param  password - user password
 * @returns hash Promise<string>
 */
export async function getPasswordHash(password: string) {
  return await bcrypt.hash(password, 10);
}

/**
 * Check user password and bcrypt hash
 * @param  hash - bcrypt hash
 * @param  password - user password
 * @returns true if success Promise<boolean>
 */
export async function checkPassword(hash: string, password: string) {
  return await bcrypt.compare(password, hash);
}
