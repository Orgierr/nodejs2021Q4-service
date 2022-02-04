import { config } from 'src/common/config';

export default {
  type: 'postgres',
  host: config.POSTGRES_HOST,
  port: config.POSTGRES_PORT,
  database: config.POSTGRES_DB,
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  synchronize: false,
  migrationsRun: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/src/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
