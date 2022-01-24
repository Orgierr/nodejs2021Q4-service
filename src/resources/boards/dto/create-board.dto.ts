import { IsArray, IsString } from 'class-validator';
import { Board } from '../entities/board.entity';
import { Column } from '../models/column.model';

export class CreateBoardDto extends Board {
  @IsString()
  title: string;

  @IsArray()
  columns: Column[];
}
