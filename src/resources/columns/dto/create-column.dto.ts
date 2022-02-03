import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';
import { apiPropertyExample } from 'src/common/constants';

export class CreateColumnDto {
  @ApiProperty({ example: apiPropertyExample.title })
  @IsString()
  title: string;

  @ApiProperty({ example: apiPropertyExample.order })
  @IsInt()
  order: number;
}
