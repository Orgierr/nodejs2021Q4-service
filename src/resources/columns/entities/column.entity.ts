import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
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
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ApiProperty({ example: apiPropertyExample.title })
  @IsNotEmpty()
  @IsString()
  @TableColumn()
  readonly title: string;

  @ApiProperty({ example: apiPropertyExample.order })
  @IsNotEmpty()
  @IsNumber()
  @TableColumn()
  readonly order: number;

  @ApiProperty({ example: apiPropertyExample.id })
  @IsUUID()
  @TableColumn()
  readonly boardId: string;

  @ApiHideProperty()
  @ManyToOne(() => Board, (board) => board.columns, { onDelete: 'CASCADE' })
  readonly board: Board;

  @ApiHideProperty()
  @OneToMany(() => Task, (task) => task.column)
  readonly task: Task;
}
