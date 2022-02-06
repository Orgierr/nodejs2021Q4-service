import { PickType } from '@nestjs/swagger';
import { Task } from '../entities/task.entity';

export class CreateTaskDto extends PickType(Task, [
  'title',
  'order',
  'description',
  'userId',
  'columnId',
  'boardId',
] as const) {}
