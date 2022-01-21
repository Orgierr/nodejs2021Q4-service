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

import { Board } from './entities/board.entity';
import { AuthGuard } from 'src/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @HttpCode(StatusCodes.CREATED)
  async createBoard(@Body() board: Board) {
    return await this.boardsService.createBoard(board);
  }

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  async getBoardById(@Param('id') id: string) {
    const board = await this.boardsService.getBoardById(id);
    if (!board) {
      throw new NotFoundException();
    }
    return board;
  }

  @Put(':id')
  async updateBoard(@Param('id') id: string, @Body() updatedBoard: Board) {
    updatedBoard.id = id;
    const board = await this.boardsService.updateBoard(updatedBoard);
    if (!board) {
      throw new NotFoundException();
    }
    return board;
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteBoardById(@Param('id') id: string) {
    const result = await this.boardsService.deleteBoardById(id);
    if (!result.affected) {
      throw new NotFoundException();
    }
  }
}
