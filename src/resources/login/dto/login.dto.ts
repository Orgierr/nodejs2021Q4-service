import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { apiPropertyExample } from 'src/common/constants';

export class LoginDto {
  @ApiProperty({ example: apiPropertyExample.password })
  @IsString()
  @MinLength(5)
  @MaxLength(25)
  password: string;

  @ApiProperty({ example: apiPropertyExample.login })
  @IsString()
  @MinLength(4)
  @MaxLength(25)
  login: string;
}
