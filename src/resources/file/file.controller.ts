import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { diskStorage } from 'multer';
import { AuthGuard } from 'src/guard/auth.guard';
import AppAnyFilesInterceptor from 'src/interceptors/any-files.interceptor';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiProduces,
  ApiBadRequestResponse,
  ApiPayloadTooLargeResponse,
} from '@nestjs/swagger';
import { FilesUploadDto } from './dto/upload-files.dto';
import { FileService } from './file.service';
import { config } from 'src/common/config';
import { ExceptionExample } from 'src/common/constants';

@ApiBearerAuth()
@ApiTags('File')
@UseGuards(AuthGuard)
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FilesUploadDto,
  })
  @ApiBadRequestResponse({ type: ExceptionExample })
  @ApiPayloadTooLargeResponse({ type: ExceptionExample })
  @Post()
  @UseInterceptors(
    AppAnyFilesInterceptor({
      limits: {
        fieldNameSize: 300,
        fileSize: 1048576,
      },
      storage: diskStorage({
        destination: config.MULTER_DEST,
        filename: (_, file, cb) => {
          return cb(null, file.originalname);
        },
      }),
    }),
  )
  uploadFile() {
    return;
  }

  @ApiProduces('application/octet-stream', 'application/json')
  @ApiOkResponse({ schema: { type: 'string', format: 'binary' } })
  @ApiNotFoundResponse({ type: ExceptionExample })
  @Get(':fileName')
  async getFile(@Param('fileName') fileName: string) {
    return await this.fileService.getFile(fileName);
  }
}
