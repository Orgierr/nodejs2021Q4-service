import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty } from 'class-validator';
import { apiPropertyExample } from 'src/common/constants';

export class CreateColumnDto {
  @ApiProperty({ example: apiPropertyExample.title })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: apiPropertyExample.order })
  @IsNotEmpty()
  @IsInt()
  order: number;
}
