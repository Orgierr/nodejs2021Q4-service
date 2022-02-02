import { ApiProperty } from '@nestjs/swagger';

export const apiPropertyExample = {
  id: '123e4567-e89b-12d3-a456-426655440000',
  login: 'myLogin',
  name: 'Foo',
  password: 'qwerty',
  title: 'Title',
  order: 1,
  description: 'description',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzNDI1MWQwMC0yMTUyLTQxNWQtOTRjOS02ZTJlOWQ1M2Y4M2YiLCJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNjQzNzI2MjE4fQ.S8cBFZrGvsP5WDn3Fc_dcxgnCM9qwEoLhCVwygeTV8k',
} as const;

export const exeptionMessage = {
  loginUsed: 'Login is already in use',
};

export class ExceptionExample {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}

export class TokenExample {
  @ApiProperty({ example: apiPropertyExample.token })
  token: string;
}
