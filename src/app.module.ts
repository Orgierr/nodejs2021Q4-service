import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './resources/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './resources/tasks/tasks.module';
import { BoardsModule } from './resources/boards/boards.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { LoginModule } from './resources/login/login.module';
import { UnhandledError } from './unhandledError/unhandled_error';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    TasksModule,
    BoardsModule,
    LoginModule,
  ],
  controllers: [],
  providers: [Logger, UnhandledError],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
