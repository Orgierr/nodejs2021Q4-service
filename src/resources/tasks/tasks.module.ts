import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Board } from '../boards/entities/board.entity';
import { BoardsService } from '../boards/boards.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Board])],
  controllers: [TasksController],
  providers: [TasksService, BoardsService],
})
export class TasksModule {}
