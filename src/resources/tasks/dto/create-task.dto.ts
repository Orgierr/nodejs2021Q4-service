import { IsInt, IsString } from 'class-validator';
import { Task } from '../entities/task.entity';

export class CreateTaskDto extends Task {
  @IsString()
  title: string;

  @IsInt()
  order: number;

  @IsString()
  description: string;
}
