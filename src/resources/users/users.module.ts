import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crypt } from 'src/crypt/crypt';
import { config } from 'src/common/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: config.JWT_SECRET_KEY,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, Crypt],
})
export class UsersModule {}
