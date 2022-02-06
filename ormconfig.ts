import { config } from 'src/common/config';
import { User } from 'src/resources/users/entities/user.entity';
import { Task } from 'src/resources/tasks/entities/task.entity';
import { Column } from 'src/resources/columns/entities/column.entity';
import { Board } from 'src/resources/boards/entities/board.entity';

export default {
  type: 'postgres',
  host: config.POSTGRES_HOST,
  port: config.POSTGRES_PORT,
  database: config.POSTGRES_DB,
  username: config.POSTGRES_USER,
  password: config.POSTGRES_PASSWORD,
  synchronize: false,
  migrationsRun: true,
  entities: [User, Task, Column, Board],
  migrations: ['dist/src/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
