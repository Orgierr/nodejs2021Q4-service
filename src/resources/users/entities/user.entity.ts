import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, IsUUID } from 'class-validator';
import { apiPropertyExample } from 'src/common/constants';
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
  @ApiProperty({ example: apiPropertyExample.id })
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ApiProperty({ example: apiPropertyExample.name })
  @IsString()
  @MinLength(1)
  @MaxLength(40)
  @Column()
  readonly name: string;

  @ApiProperty({ example: apiPropertyExample.login })
  @IsString()
  @MinLength(4)
  @MaxLength(25)
  @Column({ unique: true })
  readonly login: string;

  @ApiProperty({ example: apiPropertyExample.password })
  @IsString()
  @MinLength(5)
  @MaxLength(25)
  @Column()
  password: string;

  @ApiHideProperty()
  @OneToMany(() => Task, (task) => task.user)
  readonly task: Task;

  @ApiHideProperty()
  @ManyToOne(() => Board, (board) => board.user)
  readonly board: Board;
}
