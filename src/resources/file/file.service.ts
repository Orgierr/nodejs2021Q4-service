import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { createReadStream, constants, ReadStream } from 'fs';
import { access } from 'fs/promises';
import { join } from 'path';
import { config } from 'src/common/config';
import { exceptionMessage } from 'src/common/constants';

@Injectable()
export class FileService {
  async getFile(fileName: string): Promise<StreamableFile> {
    try {
      await access(`${config.MULTER_DEST}/${fileName}`, constants.R_OK);
      const file: ReadStream = createReadStream(
        join(process.cwd(), `${config.MULTER_DEST}/${fileName}`),
      );
      return new StreamableFile(file);
    } catch (error) {
      throw new NotFoundException(exceptionMessage.noFoundFile);
    }
  }
}
