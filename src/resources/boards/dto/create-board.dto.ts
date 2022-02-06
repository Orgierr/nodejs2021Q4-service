import { ApiProperty, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested, IsArray } from 'class-validator';
import { CreateColumnDto } from 'src/resources/columns/dto/create-column.dto';
import { Board } from '../entities/board.entity';

export class CreateBoardDto extends PickType(Board, ['title', 'id'] as const) {
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => CreateColumnDto)
  @IsArray()
  readonly columns: CreateColumnDto[];
}
