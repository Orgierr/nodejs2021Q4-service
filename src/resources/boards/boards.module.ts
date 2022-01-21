import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { Board } from './entities/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/common/config';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    JwtModule.register({
      secret: config.JWT_SECRET_KEY,
    }),
  ],

  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
