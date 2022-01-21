import { Task } from 'src/resources/tasks/entities/task.entity';
import { User } from 'src/resources/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column as TableColumn,
  OneToMany,
} from 'typeorm';
import { Column } from '../models/column.model';

@Entity({ name: 'boards' })
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @TableColumn()
  title: string;

  @TableColumn({ type: 'json' })
  columns: Column[];

  @OneToMany(() => User, (user) => user.board)
  user: User;

  @OneToMany(() => Task, (task) => task.board)
  task: Task;
}
