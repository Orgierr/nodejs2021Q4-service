import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { apiPropertyExample } from 'src/common/constants';
import { CreateColumnDto } from 'src/resources/columns/dto/create-column.dto';

export class CreateBoardDto {
  @ApiProperty({ example: apiPropertyExample.title })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => CreateColumnDto)
  @IsArray()
  columns: CreateColumnDto[];
}
