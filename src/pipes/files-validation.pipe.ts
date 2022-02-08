import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { exceptionMessage } from 'src/common/constants';

@Injectable()
export class FilesUploadPipe
  implements
    PipeTransform<Array<Express.Multer.File>, Array<Express.Multer.File>>
{
  transform(value: Array<Express.Multer.File>): Array<Express.Multer.File> {
    if (!value.length) {
      throw new BadRequestException(exceptionMessage.filesEmpty);
    }
    return value;
  }
}
