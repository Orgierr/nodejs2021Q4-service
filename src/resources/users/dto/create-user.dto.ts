import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { apiPropertyExample } from 'src/common/constants';

export class CreateUserDto {
  @ApiProperty({ example: apiPropertyExample.login })
  @IsString()
  @MinLength(4)
  @MaxLength(25)
  login: string;

  @ApiProperty({ example: apiPropertyExample.password })
  @IsString()
  @MinLength(5)
  @MaxLength(25)
  password: string;

  @ApiProperty({ example: apiPropertyExample.name })
  @IsString()
  @MinLength(1)
  @MaxLength(40)
  name: string;
}
