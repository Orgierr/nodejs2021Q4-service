export default {
  type: 'postgres',
  host: process.env['POSTGRES_HOST'],
  port: process.env['POSTGRES_PORT'],
  database: process.env['POSTGRES_DB'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  synchronize: true,
  entities: ['./src/typeorm/entitys/*.ts'],
  migrations: ['./src/typeorm/migrations/*.ts'],
  cli: {
    entitiesDir: './src/typeorm/entitys/',
    migrationsDir: './src/typeorm/migrations/',
  },
};
