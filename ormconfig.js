module.exports = {
  type: 'postgres',
  host: process.env['POSTGRES_HOST'],
  port: process.env['POSTGRES_PORT'],
  database: process.env['POSTGRES_DB'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  synchronize: false,
  // synchronize: false,
  // migrationsRun: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  cli: {
    entitiesDir: 'dist/**/*.entity{.ts,.js}',
    migrationsDir: 'src/migrations',
  },
};
