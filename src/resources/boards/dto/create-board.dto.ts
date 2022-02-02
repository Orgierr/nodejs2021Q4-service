import { IsArray, IsString } from 'class-validator';
import { Column } from 'src/resources/columns/entities/column.entity';
import { Board } from '../entities/board.entity';

export class CreateBoardDto extends Board {
  @IsString()
  title: string;

  @IsArray()
  columns: Column[];
}
