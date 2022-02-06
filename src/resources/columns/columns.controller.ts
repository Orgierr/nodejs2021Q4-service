import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Put,
  BadRequestException,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiTags,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiParam,
} from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import { ExceptionExample, exceptionMessage } from 'src/common/constants';
import { AuthGuard } from 'src/guard/auth.guard';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { Column } from './entities/column.entity';

@ApiBearerAuth()
@ApiTags('Columns')
@UseGuards(AuthGuard)
@Controller('/boards/:boardId/columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @ApiOperation({ summary: 'Create column for board' })
  @ApiCreatedResponse({ type: Column })
  @ApiNotFoundResponse({ type: ExceptionExample })
  @Post()
  @HttpCode(StatusCodes.CREATED)
  async create(
    @Body() createColumnDto: CreateColumnDto,
    @Param(
      'boardId',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException(exceptionMessage.noValidBoardId),
      }),
    )
    boardId: string,
  ) {
    return await this.columnsService.createColumn(createColumnDto, boardId);
  }

  @ApiOperation({ summary: 'Get all columns by boardId' })
  @ApiOkResponse({ type: [Column] })
  @ApiNotFoundResponse({ type: ExceptionExample })
  @ApiParam({
    name: 'boardId',
    format: 'uuid',
  })
  @Get()
  async getAllColumnsByBoardId(
    @Param(
      'boardId',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException(exceptionMessage.noValidBoardId),
      }),
    )
    boardId: string,
  ) {
    return await this.columnsService.getAllColumnsByBoardId(boardId);
  }

  @ApiOperation({ summary: 'Get  column by boardId and columnId' })
  @ApiOkResponse({ type: Column })
  @ApiNotFoundResponse({ type: ExceptionExample })
  @ApiParam({
    name: 'boardId',
    format: 'uuid',
  })
  @ApiParam({
    name: 'columnId',
    format: 'uuid',
  })
  @Get(':columnId')
  async getColumnByBoardIdAndColumnId(
    @Param(
      'boardId',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException(exceptionMessage.noValidBoardId),
      }),
    )
    boardId: string,
    @Param(
      'columnId',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException(exceptionMessage.noValidColumnId),
      }),
    )
    columnId: string,
  ) {
    return await this.columnsService.getColumnByBoardIdAndColumnId(
      boardId,
      columnId,
    );
  }

  @ApiOperation({ summary: 'Update column by  columnId' })
  @ApiOkResponse({ type: Column })
  @ApiNotFoundResponse({ type: ExceptionExample })
  @ApiParam({
    name: 'boardId',
    format: 'uuid',
  })
  @ApiParam({
    name: 'columnId',
    format: 'uuid',
  })
  @Put(':columnId')
  async updateColumn(
    @Param(
      'columnId',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException(exceptionMessage.noValidColumnId),
      }),
    )
    columnId: string,
    @Body() updatedColumn: UpdateColumnDto,
  ) {
    return await this.columnsService.updateColumn(updatedColumn, columnId);
  }

  @ApiOperation({ summary: 'Delete column by columnId' })
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: ExceptionExample })
  @ApiParam({
    name: 'boardId',
    format: 'uuid',
  })
  @ApiParam({
    name: 'columnId',
    format: 'uuid',
  })
  @Delete(':columnId')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteColumn(
    @Param(
      'columnId',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException(exceptionMessage.noValidColumnId),
      }),
    )
    columnId: string,
  ) {
    return await this.columnsService.deleteColumn(columnId);
  }
}
