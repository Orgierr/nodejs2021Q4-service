import { Logger, Module } from '@nestjs/common';
import { UsersModule } from './resources/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './resources/tasks/tasks.module';
import { BoardsModule } from './resources/boards/boards.module';
import { LoginModule } from './resources/login/login.module';
import { UnhandledError } from './unhandledError/unhandled_error';
import { FileModule } from './resources/file/file.module';
import { JwtAppModule } from './jwt-app/jwt-app.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    TasksModule,
    BoardsModule,
    LoginModule,
    FileModule,
    JwtAppModule,
  ],
  controllers: [],
  providers: [Logger, UnhandledError],
})
export class AppModule {}
