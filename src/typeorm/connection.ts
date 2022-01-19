import { createConnection, getRepository } from 'typeorm';
import { logger } from '../logger/logger';
import { getPasswordHash } from '../utils/password_hash';
import { User } from './entitys/users';

createConnection().then(async (_) => {
  await getRepository(User).save({
    login: 'admin',
    password: await getPasswordHash('admin'),
    name: 'Foo',
  });
  logger.info('Postgres connected');
});
