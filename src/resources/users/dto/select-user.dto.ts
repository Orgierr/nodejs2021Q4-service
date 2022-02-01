import { ApiProperty } from '@nestjs/swagger';
import { apiPropertyExample } from 'src/common/constants';

export class SelectUserDto {
  @ApiProperty({ example: apiPropertyExample.id })
  id: string;

  @ApiProperty({ example: apiPropertyExample.login })
  login: string;

  @ApiProperty({ example: apiPropertyExample.name })
  name: string;
}
