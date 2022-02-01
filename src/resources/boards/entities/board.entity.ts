import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { apiPropertyExample } from 'src/common/constants';
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
  @ApiProperty({ example: apiPropertyExample.id })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: apiPropertyExample.title })
  @TableColumn()
  title: string;

  @ApiProperty({ example: apiPropertyExample.title })
  @TableColumn({ type: 'json' })
  columns: Column[];

  @ApiHideProperty()
  @OneToMany(() => User, (user) => user.board)
  user: User;

  @ApiHideProperty()
  @OneToMany(() => Task, (task) => task.board)
  task: Task;
}
