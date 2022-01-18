import bcrypt from 'bcrypt';

export async function getPasswordHash(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function checkPassword(hash: string, password: string) {
  return await bcrypt.compare(password, hash);
}
