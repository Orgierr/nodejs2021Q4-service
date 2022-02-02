import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  NotFoundException,
  Put,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiTags,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { StatusCodes } from 'http-status-codes';
import { ExceptionExample } from 'src/common/constants';
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
  @Post()
  @HttpCode(StatusCodes.CREATED)
  create(@Body() createColumnDto: CreateColumnDto) {
    return this.columnsService.createColumn(createColumnDto);
  }

  @ApiOperation({ summary: 'Get all columns by boardId' })
  @ApiOkResponse({ type: [Column] })
  @ApiNotFoundResponse({ type: ExceptionExample })
  @Get()
  async getAllColumnsByBoardId(@Param('boardId') boardId: string) {
    return await this.columnsService.getAllColumnsByBoardId(boardId);
  }

  @ApiOperation({ summary: 'Get  task by columnId' })
  @ApiOkResponse({ type: Column })
  @ApiNotFoundResponse({ type: ExceptionExample })
  @Get(':columnId')
  async getColumnByBoardIdAndColumnId(
    @Param('boardId') boardId: string,
    @Param('columnId') columnId: string,
  ) {
    const task = await this.columnsService.getColumnByBoardIdAndColumnId(
      boardId,
      columnId,
    );
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  @ApiOperation({ summary: 'Update column by columnId' })
  @ApiOkResponse({ type: Column })
  @ApiNotFoundResponse({ type: ExceptionExample })
  @Put(':columnId')
  async updateColumn(
    @Param('columnId') columnId: string,
    @Body() updatedColumn: UpdateColumnDto,
  ) {
    const column = await this.columnsService.updateColumn(
      updatedColumn,
      columnId,
    );
    if (!column) {
      throw new NotFoundException();
    }
    return column;
  }

  @ApiOperation({ summary: 'Delete column by columnId' })
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: ExceptionExample })
  @Delete(':columnId')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteColumn(@Param('columnId') columnId: string) {
    const result = await this.columnsService.deleteColumn(columnId);
    if (!result.affected) {
      throw new NotFoundException();
    }
  }
}
