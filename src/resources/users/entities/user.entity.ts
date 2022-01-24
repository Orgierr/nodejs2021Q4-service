import { Board } from 'src/resources/boards/entities/board.entity';
import { Task } from 'src/resources/tasks/entities/task.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';

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
   * Get from user id,name,login string
   *
   * @param  user - user to destruct
   * @returns id (string), name (string), login (string)
   */
  static toResponse(user: User | UpdateUserDto) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
