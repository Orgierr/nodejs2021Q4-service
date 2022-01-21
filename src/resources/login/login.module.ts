import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { User } from '../users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crypt } from 'src/crypt/crypt';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/common/config';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: config.JWT_SECRET_KEY,
    }),
  ],
  controllers: [LoginController],
  providers: [LoginService, Crypt],
})
export class LoginModule {}
