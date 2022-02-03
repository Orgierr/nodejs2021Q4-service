import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { apiPropertyExample } from 'src/common/constants';
import { Column } from 'src/resources/columns/entities/column.entity';

export class CreateBoardDto {
  @ApiProperty({ example: apiPropertyExample.title })
  @IsString()
  title: string;

  @ApiProperty()
  @IsArray()
  columns: Column[];
}
