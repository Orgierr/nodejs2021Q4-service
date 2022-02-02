import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { apiPropertyExample } from 'src/common/constants';
import { Board } from 'src/resources/boards/entities/board.entity';
import { Task } from 'src/resources/tasks/entities/task.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column as TableColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'columns' })
export class Column {
  @ApiProperty({ example: apiPropertyExample.id })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: apiPropertyExample.title })
  @TableColumn()
  title: string;

  @ApiProperty({ example: apiPropertyExample.order })
  @TableColumn()
  order: number;

  @ApiHideProperty()
  @ManyToOne(() => Board, (board) => board.user, { onDelete: 'CASCADE' })
  board: Board;

  @ApiHideProperty()
  @OneToMany(() => Task, (task) => task.column)
  task: Task;
}
