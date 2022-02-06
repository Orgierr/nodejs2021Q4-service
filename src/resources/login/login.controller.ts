import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TokenExample } from 'src/common/constants';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @ApiOperation({ summary: 'Login to app' })
  @ApiOkResponse({ type: TokenExample })
  @ApiForbiddenResponse()
  @Post()
  async login(@Body() auth: LoginDto) {
    return await this.loginService.login(auth.login, auth.password);
  }
}
