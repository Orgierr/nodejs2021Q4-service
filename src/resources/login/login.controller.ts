import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @Post()
  async login(@Body() auth: LoginDto) {
    return await this.loginService.login(auth.login, auth.password);
  }
}
