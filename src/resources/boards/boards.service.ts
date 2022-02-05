import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  /**
   * Add new board in db
   * @param board - board instance (Board)
   * @returns created board (Board)
   */
  createBoard(board: CreateBoardDto): Promise<Board> {
    return this.boardRepository.save(board);
  }

  /**
   * Get all boards
   * @returns all boards (Board[])
   */
  findAll(): Promise<Board[]> {
    return this.boardRepository
      .createQueryBuilder('boards')
      .leftJoinAndSelect('boards.columns', 'column')
      .orderBy('column.order', 'ASC')
      .getMany();
  }

  /**
   * Get board by id
   * @param  id - board id (string)
   * @returns  board by id  Promise(Board)
   */
  async getBoardById(id: string): Promise<Board> {
    const board: Board | undefined = await this.boardRepository
      .createQueryBuilder('boards')
      .leftJoinAndSelect('boards.columns', 'column')
      .where({ id: id })
      .orderBy('column.order', 'ASC')
      .getOne();
    if (!board) {
      throw new NotFoundException();
    }
    return board;
  }

  /**
   * Update board
   * @param updatedBoard - new board data (Board)
   * @returns  new board data Promise(Board)
   */
  async updateBoard(updatedBoard: UpdateBoardDto, id: string): Promise<Board> {
    const board: Board | undefined = await this.boardRepository.findOne(id);
    if (board) {
      const result: Board = await this.boardRepository.save(updatedBoard);
      if (result.id) {
        return result;
      }
    }
    throw new NotFoundException();
  }

  /**
   * Delete board by id
   * @param  id - board id (string)
   * @returns  deleted result Promise(DeleteResult)
   */
  async deleteBoardById(id: string): Promise<void> {
    const result: DeleteResult = await this.boardRepository.delete({ id: id });
    if (!result.affected) {
      throw new NotFoundException();
    }
  }
}
