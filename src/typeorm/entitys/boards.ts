import {
  Entity,
  PrimaryGeneratedColumn,
  Column as TableColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { Column } from './columns';
import { Task } from './tasks';
import { User } from './users';

@Entity({ name: 'boards' })
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @TableColumn()
  title: string;

  @OneToMany(() => Column, (column) => column.board, {
    cascade: true,
    nullable: true,
  })
  @JoinTable()
  columns: Column[];

  @OneToMany(() => User, (user) => user.board)
  user: User;

  @OneToMany(() => Task, (task) => task.board)
  task: Task;
}
