import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ExceptionExample, TokenExample } from 'src/common/constants';
import { TokenToResponse } from 'src/types/types';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}
  @ApiOperation({ summary: 'Login to app' })
  @ApiOkResponse({ type: TokenExample })
  @ApiForbiddenResponse({ type: ExceptionExample })
  @Post()
  async login(@Body() auth: LoginDto): Promise<TokenToResponse> {
    return await this.loginService.login(auth.login, auth.password);
  }
}
