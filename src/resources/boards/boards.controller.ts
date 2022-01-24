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

@UseGuards(AuthGuard)
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @HttpCode(StatusCodes.CREATED)
  async createBoard(@Body() board: CreateBoardDto) {
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

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteBoardById(@Param('id') id: string) {
    const result = await this.boardsService.deleteBoardById(id);
    if (!result.affected) {
      throw new NotFoundException();
    }
  }
}
