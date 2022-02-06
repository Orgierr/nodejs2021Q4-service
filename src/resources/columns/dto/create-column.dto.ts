import { PartialType } from '@nestjs/swagger';
import { Column } from '../entities/column.entity';

export class CreateColumnDto extends PartialType(Column) {}
