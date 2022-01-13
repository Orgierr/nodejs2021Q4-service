import {
  Entity,
  PrimaryGeneratedColumn,
  Column as TableColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Board } from './boards';
import { Task } from './tasks';

@Entity({ name: 'columns' })
export class Column {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @TableColumn()
  title: string;

  @TableColumn()
  order: number;

  @ManyToOne(() => Board, (board) => board.user, { onDelete: 'CASCADE' })
  board: Board;

  @OneToMany(() => Task, (task) => task.column)
  task: Task;
}
