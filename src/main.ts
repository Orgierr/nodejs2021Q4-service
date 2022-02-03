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
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './common/swagger_config';
import { ConfigService } from '@nestjs/config';
import { ConfigProperty } from './enums/config_property';
async function bootstrap() {
  const configService = new ConfigService();
  const USE_FASTIFY = configService.get<boolean>(ConfigProperty.USE_FASTIFY);
  const HttpAdapter = USE_FASTIFY ? FastifyAdapter : ExpressAdapter;
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new HttpAdapter(),
  );
  app.useLogger(WinstonModule.createLogger(winstonConfig));
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, Logger));
  app.useGlobalInterceptors(new AllInterceptorInterceptor(Logger));
  app.useGlobalPipes(new ValidationPipe());
  if (USE_FASTIFY) {
    app.register(contentParser);
  }

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/doc', app, document);

  await app.listen(config.PORT || 4000, config.ADDRESS);
}
bootstrap();
