import { createConnection, getRepository } from 'typeorm';
import { logger } from '../logger/logger';
import { User } from './entitys/users';

createConnection().then(async (_) => {
  await getRepository(User).save({
    login: 'admin',
    password: 'admin',
    name: 'Foo',
  });
  logger.info('Postgres connected');
});
