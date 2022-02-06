import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString } from 'class-validator';
import { apiPropertyExample } from 'src/common/constants';
import { Column } from 'src/resources/columns/entities/column.entity';
import { Task } from 'src/resources/tasks/entities/task.entity';
import { User } from 'src/resources/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column as TableColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'boards' })
export class Board {
  @ApiProperty({ example: apiPropertyExample.id })
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ApiProperty({ example: apiPropertyExample.title })
  @IsNotEmpty()
  @IsString()
  @TableColumn()
  readonly title: string;

  @ApiProperty()
  @OneToMany(() => Column, (column) => column.board, {
    cascade: true,
    nullable: true,
  })
  @JoinTable()
  readonly columns: Column[];

  @ApiHideProperty()
  @OneToMany(() => User, (user) => user.board)
  readonly user: User;

  @ApiHideProperty()
  @OneToMany(() => Task, (task) => task.board)
  readonly task: Task;
}
