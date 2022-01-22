import { Body, Controller, Post } from '@nestjs/common';
import { UserAuthType } from 'src/types/types';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post()
  async login(@Body() auth: UserAuthType) {
    throw new Error('sds');

    return await this.loginService.login(auth.login, auth.password);
  }
}
