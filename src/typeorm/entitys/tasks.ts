import {
  Entity,
  PrimaryGeneratedColumn,
  Column as TableColumn,
  ManyToOne,
} from 'typeorm';
import { Board } from './boards';
import { Column } from './columns';
import { User } from './users';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @TableColumn()
  title: string;

  @TableColumn()
  order: number;

  @TableColumn()
  description: string;

  @TableColumn({ nullable: true })
  userId: string;

  @TableColumn({ nullable: true })
  boardId: string;

  @TableColumn({ nullable: true })
  columnId: string;

  @ManyToOne(() => Column, (column) => column.task)
  column: Column;

  @ManyToOne(() => User, (user) => user.task, { onDelete: 'SET NULL' })
  user: User;

  @ManyToOne(() => Board, (board) => board.task, { onDelete: 'CASCADE' })
  board: Board;

  /**
   * Get from user id, title, order, description,userId
   *
   * @param  task - task to destruct
   * @returns id string, title string, order number|null, description string, userId string
   */
  static toResponse(task: Task) {
    const { id, title, order, description, userId } = task;
    return { id, title, order, description, userId };
  }
}
