import { Module } from '@nestjs/common';
import { UsersModule } from './resources/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './resources/tasks/tasks.module';
import { BoardsModule } from './resources/boards/boards.module';
@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, TasksModule, BoardsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
