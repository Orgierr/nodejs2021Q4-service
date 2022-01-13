import { createConnection } from 'typeorm';
import { logger } from '../logger/logger';

createConnection().then((_) => logger.info('Postgres connected'));
