// import { createConnection } from 'typeorm';
import { config } from '../common/config';

// createConnection({
//   type: 'postgres',
//   url: `postgres://${config.POSTGRES_USER}:${config.POSTGRES_PASSWORD}@${config.POSTGRES_HOST}/${config.POSTGRES_DB}`,
// }).then((_) => console.log('Postgres connected'));

import { Client } from 'pg';
import { logger } from '../logger/logger';

const client = new Client({
  host: config.POSTGRES_HOST,
  port: Number(config.POSTGRES_PORT),
  user: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
});

client.connect().then((_) => logger.info('Postgres connected'));
