import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { apiPropertyExample } from 'src/common/constants';

export class CreateTaskDto {
  @ApiProperty({ example: apiPropertyExample.title })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: apiPropertyExample.order })
  @IsNotEmpty()
  @IsInt()
  order: number;

  @ApiProperty({ example: apiPropertyExample.description })
  @IsString()
  description: string;
}
