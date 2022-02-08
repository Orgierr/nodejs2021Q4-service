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

export const exceptionMessage = {
  loginUsed: 'Login is already in use',
  noValidUserId: 'Validation failed (user id must be uuid is expected)',
  noValidBoardId: 'Validation failed (board id must be uuid is expected)',
  noValidTaskId: 'Validation failed (task id must be uuid is expected)',
  noValidColumnId: 'Validation failed (column id must be uuid is expected)',
  noFoundBoard: 'Not Found board',
  noFoundUser: 'Not Found user by id',
  noFoundTask: 'Not Found task',
  noFoundColumn: 'Not Found column',
  noFoundLogin: 'Wrong password or login',
  noFoundFile: 'Not found file',
  filesEmpty: 'Files empty',
};

export class ExceptionExample {
  @ApiProperty({ example: 409 })
  statusCode: number;

  @ApiProperty({ example: exceptionMessage.loginUsed })
  message: string;

  @ApiProperty({ example: 'Conflict' })
  error: string;
}

export class TokenExample {
  @ApiProperty({ example: apiPropertyExample.token })
  token: string;
}
