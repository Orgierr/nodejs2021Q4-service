import { Injectable } from '@nestjs/common';
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
   * @returns  board by id  Promise(Board | undefined)
   */
  getBoardById(id: string): Promise<Board | undefined> {
    return this.boardRepository
      .createQueryBuilder('boards')
      .leftJoinAndSelect('boards.columns', 'column')
      .where({ id: id })
      .orderBy('column.order', 'ASC')
      .getOne();
  }

  /**
   * Update board
   * @param updatedBoard - new board data (Board)
   * @returns  new board data Promise(Board|undefined)
   */
  async updateBoard(
    updatedBoard: UpdateBoardDto,
    id: string,
  ): Promise<UpdateBoardDto | undefined> {
    const board = await this.boardRepository.findOne(id);
    if (board) {
      const result = await this.boardRepository.save(updatedBoard);
      if (result.id) {
        return result;
      }
    }
    return undefined;
  }

  /**
   * Delete board by id
   * @param  id - board id (string)
   * @returns  deleted result Promise(DeleteResult)
   */
  deleteBoardById(id: string): Promise<DeleteResult> {
    return this.boardRepository.delete({ id: id });
  }
}
