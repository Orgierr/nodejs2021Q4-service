import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './common/config';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './common/winston_config';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { ExpressAdapter } from '@nestjs/platform-express/adapters';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const HttpAdapter = config.USE_FASTIFY ? FastifyAdapter : ExpressAdapter;
  const app = await NestFactory.create(AppModule, new HttpAdapter());
  app.useLogger(WinstonModule.createLogger(winstonConfig));
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, Logger));
  await app.listen(config.PORT || 4000);
}
bootstrap();
