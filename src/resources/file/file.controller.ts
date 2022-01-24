import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Response } from 'express';

@Controller('file')
export class FileController {
  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
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
    const file = createReadStream(join(process.cwd(), `/static/${fileName}`));
    file.pipe(res);
  }
}
