import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { apiPropertyExample } from 'src/common/constants';
import { Board } from 'src/resources/boards/entities/board.entity';
import { Column } from 'src/resources/columns/entities/column.entity';
import { User } from 'src/resources/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column as TableColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'tasks' })
export class Task {
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
  @IsInt()
  @TableColumn()
  readonly order: number;

  @ApiProperty({ example: apiPropertyExample.description })
  @IsString()
  @TableColumn()
  readonly description: string;

  @ApiProperty({ example: apiPropertyExample.id })
  @IsUUID()
  @IsOptional()
  @TableColumn({ nullable: true })
  readonly userId: string;

  @ApiProperty({ example: apiPropertyExample.id })
  @IsUUID()
  @IsOptional()
  @TableColumn({ nullable: true })
  readonly boardId: string;

  @ApiProperty({ example: apiPropertyExample.id })
  @IsUUID()
  @IsOptional()
  @TableColumn({ nullable: true })
  readonly columnId: string;

  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.task, { onDelete: 'SET NULL' })
  readonly user: User;

  @ApiHideProperty()
  @ManyToOne(() => Column, (column) => column.task)
  readonly column: Column;

  @ApiHideProperty()
  @ManyToOne(() => Board, (board) => board.task, { onDelete: 'CASCADE' })
  readonly board: Board;
}
