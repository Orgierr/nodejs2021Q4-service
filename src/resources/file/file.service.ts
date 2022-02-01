import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { createReadStream, constants } from 'fs';
import { access } from 'fs/promises';
import { join } from 'path';
import { config } from 'src/common/config';

@Injectable()
export class FileService {
  async getFile(fileName: string): Promise<StreamableFile> {
    try {
      await access(`${config.MULTER_DEST}/${fileName}`, constants.R_OK);
      const file = createReadStream(
        join(process.cwd(), `${config.MULTER_DEST}/${fileName}`),
      );
      return new StreamableFile(file);
    } catch (error) {
      throw new NotFoundException('Not found file');
    }
  }
}
