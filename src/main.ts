import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './common/config';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { ExpressAdapter } from '@nestjs/platform-express/adapters';
import { FastifyAdapter } from '@nestjs/platform-fastify';
async function bootstrap() {
  const HttpAdapter = config.USE_FASTIFY ? FastifyAdapter : ExpressAdapter;
  const app = await NestFactory.create(AppModule, new HttpAdapter());
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.listen(config.PORT || 4000);
}
bootstrap();
