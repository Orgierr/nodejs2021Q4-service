import { NestInterceptor, Type } from "@nestjs/common";
import { AnyFilesFastifyInterceptor } from "fastify-file-interceptor";
import multer from "multer";
import { config } from "src/common/config";

export default function AnyFilesInterceptor(localOptions?: multer.Options | undefined):Type<NestInterceptor<unknown, unknown>>{
  return config.USE_FASTIFY
      ? AnyFilesFastifyInterceptor(localOptions)
      : AnyFilesInterceptor(localOptions),
}