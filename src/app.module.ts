import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './resources/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './resources/tasks/tasks.module';
import { BoardsModule } from './resources/boards/boards.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { LoginModule } from './resources/login/login.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './common/winston_config';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    TasksModule,
    BoardsModule,
    LoginModule,
    WinstonModule.forRoot(winstonConfig),
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
