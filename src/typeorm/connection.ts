import { createConnection } from 'typeorm';
import { config } from '../common/config';
import { logger } from '../logger/logger';

createConnection({
  type: 'postgres',
  url: `postgres://${config.POSTGRES_USER}:${config.POSTGRES_PASSWORD}@${config.POSTGRES_HOST}/${config.POSTGRES_DB}`,
}).then((_) => logger.info(`'Postgres connected'`));
