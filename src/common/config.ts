import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: Number(process.env['PORT']),
  NODE_ENV: process.env['NODE_ENV'],
  JWT_SECRET_KEY: process.env['JWT_SECRET_KEY'],
  AUTH_MODE: process.env['AUTH_MODE'] === 'true',
  LOG_LEVEL: process.env['LOG_LEVEL'],
  POSTGRES_PORT: process.env['POSTGRES_PORT'],
  POSTGRES_USER: process.env['POSTGRES_USER'],
  POSTGRES_PASSWORD: process.env['POSTGRES_PASSWORD'],
  POSTGRES_HOST: process.env['POSTGRES_HOST'],
  POSTGRES_DB: process.env['POSTGRES_DB'],
  USE_FASTIFY: process.env['USE_FASTIFY'] === 'true',
  MULTER_DEST: process.env['MULTER_DEST'],
  ADDRESS: String(process.env['ADDRESS']),
};
