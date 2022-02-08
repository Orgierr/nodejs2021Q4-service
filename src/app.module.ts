import { Logger, Module } from '@nestjs/common';
import { UsersModule } from './resources/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './resources/tasks/tasks.module';
import { BoardsModule } from './resources/boards/boards.module';
import { LoginModule } from './resources/login/login.module';
import { FileModule } from './resources/file/file.module';
import { JwtAppModule } from './jwt-app/jwt-app.module';
import { ColumnsModule } from './resources/columns/columns.module';
import ormconfig from '../ormconfig';
import { ConnectionOptions } from 'typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig as ConnectionOptions),
    UsersModule,
    TasksModule,
    BoardsModule,
    LoginModule,
    FileModule,
    JwtAppModule,
    ColumnsModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {}
