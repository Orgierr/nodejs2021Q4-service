import { Module } from '@nestjs/common';
import { UsersModule } from './resources/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './resources/tasks/tasks.module';
import { BoardsModule } from './resources/boards/boards.module';
import { LoginModule } from './resources/login/login.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    TasksModule,
    BoardsModule,
    LoginModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
