import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Column } from './entities/column.entity';
import { Board } from '../boards/entities/board.entity';
import { BoardsService } from '../boards/boards.service';

@Module({
  imports: [TypeOrmModule.forFeature([Column, Board])],
  controllers: [ColumnsController],
  providers: [ColumnsService, BoardsService],
})
export class ColumnsModule {}
