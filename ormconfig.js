module.exports = {
  type: 'postgres',
  host: process.env['POSTGRES_HOST'],
  port: process.env['POSTGRES_PORT'],
  database: process.env['POSTGRES_DB'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  synchronize: true,
  // migrationsRun: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  // migrations: ['dist/migrations/*{.ts,.js}'],
  cli: {
    entitiesDir: 'dist/**/*.entity{.ts,.js}',
    // migrationsDir: 'dist/migrations',
  },
};
