import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { apiPropertyExample } from 'src/common/constants';

export class LoginDto {
  @ApiProperty({ example: apiPropertyExample.password })
  @IsString()
  password: string;

  @ApiProperty({ example: apiPropertyExample.login })
  @IsString()
  login: string;
}
