import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './common/config';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './common/winston_config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });
  await app.listen(config.PORT || 4000);
}
bootstrap();
