import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import { apiPropertyExample } from 'src/common/constants';

export class CreateTaskDto {
  @ApiProperty({ example: apiPropertyExample.title })
  @IsString()
  title: string;

  @ApiProperty({ example: apiPropertyExample.order })
  @IsInt()
  order: number;

  @ApiProperty({ example: apiPropertyExample.description })
  @IsString()
  description: string;
}
