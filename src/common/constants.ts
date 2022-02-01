import { ApiProperty } from '@nestjs/swagger';

export const apiPropertyExample = {
  id: '123e4567-e89b-12d3-a456-426655440000',
  login: 'myLogin',
  name: 'Foo',
  password: 'qwerty',
} as const;

export class ExceptionExample {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
