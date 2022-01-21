import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  // @OneToMany(() => Task, (task) => task.user)
  // task!: Task;

  // @ManyToOne(() => Board, (board) => board.user)
  // board!: Board;
}
