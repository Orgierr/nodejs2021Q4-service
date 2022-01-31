import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './common/config';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './common/winston_config';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { ExpressAdapter } from '@nestjs/platform-express/adapters';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllInterceptorInterceptor } from './interceptors/all-interceptor.interceptor';
import { contentParser } from 'fastify-file-interceptor';
import YAML from 'yamljs';
import { SwaggerModule } from '@nestjs/swagger';
import path from 'path';
async function bootstrap() {
  const HttpAdapter = config.USE_FASTIFY ? FastifyAdapter : ExpressAdapter;
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new HttpAdapter(),
  );
  app.useLogger(WinstonModule.createLogger(winstonConfig));
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, Logger));
  app.useGlobalInterceptors(new AllInterceptorInterceptor(Logger));
  app.useGlobalPipes(new ValidationPipe());
  if (config.USE_FASTIFY) {
    app.register(contentParser);
  }

  const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
  SwaggerModule.setup('/doc', app, swaggerDocument);

  await app.listen(config.PORT || 4000, '0.0.0.0');
}
bootstrap();
