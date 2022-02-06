import { PickType } from '@nestjs/swagger';
import { Column } from '../entities/column.entity';

export class CreateColumnDto extends PickType(Column, [
  'title',
  'order',
] as const) {}
