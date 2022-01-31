import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Response } from 'express';
import { AuthGuard } from 'src/guard/auth.guard';
import AppAnyFilesInterceptor from 'src/interceptors/any-files.interceptor';

@UseGuards(AuthGuard)
@Controller('file')
export class FileController {
  @Post()
  @UseInterceptors(
    AppAnyFilesInterceptor({
      storage: diskStorage({
        destination: './static',
        filename: (_, file, cb) => {
          return cb(null, file.originalname);
        },
      }),
    }),
  )
  uploadFile() {
    return;
  }

  @Get(':fileName')
  getFile(@Param('fileName') fileName: string, @Res() res: Response) {
    try {
      const file = createReadStream(
        join(process.cwd(), `/static/${fileName}`),
      ).on('error', () => null);
      file.pipe(res).on('error', () => null);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
