import { NestInterceptor, Type } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express/multer';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { AnyFilesFastifyInterceptor } from 'fastify-file-interceptor';
import multer from 'multer';
import { config } from 'src/common/config';

export default function AppAnyFilesInterceptor(
  localOptions?: (multer.Options & MulterOptions) | undefined,
): Type<NestInterceptor<unknown, unknown>> {
  if (config.USE_FASTIFY) {
    return AnyFilesFastifyInterceptor(localOptions);
  }
  return AnyFilesInterceptor(localOptions);
}
