import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { StatusCodes } from 'http-status-codes';

import { AuthGuard } from 'src/guard/auth.guard';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Board } from './entities/board.entity';
import { ExceptionExample } from 'src/common/constants';

@ApiBearerAuth()
@ApiTags('Boards')
@UseGuards(AuthGuard)
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiOperation({ summary: 'Create board' })
  @ApiCreatedResponse({ type: Board })
  @Post()
  @HttpCode(StatusCodes.CREATED)
  async createBoard(@Body() board: CreateBoardDto) {
    return await this.boardsService.createBoard(board);
  }

  @ApiOperation({ summary: 'Get all boards' })
  @ApiOkResponse({ type: [Board] })
  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @ApiOperation({ summary: 'Get board by id' })
  @ApiOkResponse({ type: Board })
  @ApiNotFoundResponse({ type: ExceptionExample })
  @Get(':id')
  async getBoardById(@Param('id') id: string) {
    const board = await this.boardsService.getBoardById(id);
    if (!board) {
      throw new NotFoundException();
    }
    return board;
  }

  @ApiOperation({ summary: 'Update board by id' })
  @ApiOkResponse({ type: Board })
  @ApiNotFoundResponse({ type: ExceptionExample })
  @Put(':id')
  async updateBoard(
    @Param('id') id: string,
    @Body() updatedBoard: UpdateBoardDto,
  ) {
    updatedBoard.id = id;
    const board = await this.boardsService.updateBoard(updatedBoard);
    if (!board) {
      throw new NotFoundException();
    }
    return board;
  }

  @ApiOperation({ summary: 'Delete board by taskId' })
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: ExceptionExample })
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteBoardById(@Param('id') id: string) {
    const result = await this.boardsService.deleteBoardById(id);
    if (!result.affected) {
      throw new NotFoundException();
    }
  }
}
