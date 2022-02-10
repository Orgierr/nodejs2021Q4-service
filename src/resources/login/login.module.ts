import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { Crypt } from 'src/crypt/crypt';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [LoginController],
  providers: [LoginService, Crypt],
})
export class LoginModule {}
