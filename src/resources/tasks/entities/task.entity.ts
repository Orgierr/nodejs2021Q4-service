import { Board } from 'src/resources/boards/entities/board.entity';
import { User } from 'src/resources/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column as TableColumn,
  ManyToOne,
} from 'typeorm';
import { UpdateTaskDto } from '../dto/update-task.dto';

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
  static toResponse(task: Task | UpdateTaskDto) {
    const { id, title, order, description, userId } = task;
    return { id, title, order, description, userId };
  }
}
