import { Board } from 'src/resources/boards/entities/board.entity';
import { Task } from 'src/resources/tasks/entities/task.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  task: Task;

  @ManyToOne(() => Board, (board) => board.user)
  board: Board;

  /**
   * Get id,name,login from user
   *
   * @param  user - user to destruct
   * @returns id (string), name (string), login (string)
   */
  static toResponse(user: User) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
