import { Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}
  /**
   * Add new user in db
   * @param board - board instance (Board)
   * @returns created board (Board)
   */
  createBoard(board: Board) {
    return this.boardRepository.save(board);
  }
  /**
   * Get all boards
   * @returns all boards (Board[])
   */
  findAll() {
    return this.boardRepository.find();
  }
  /**
   * Get board by id
   * @param  id - board id (string)
   * @returns  board by id  Promise(Board | undefined)
   */
  getBoardById(id: string) {
    return this.boardRepository.findOne({ id: id });
  }
  /**
   * Update board
   * @param updatedBoard - new board data (Board)
   * @returns  new board data Promise(Board|undefined)
   */
  async updateBoard(updatedBoard: Board) {
    const result = await this.boardRepository.save(updatedBoard);
    if (result.id) {
      return updatedBoard;
    }
    return undefined;
  }
  /**
   * Delete board by id
   * @param  id - board id (string)
   * @returns  deleted result Promise(DeleteResult)
   */
  deleteBoardById(id: string) {
    return this.boardRepository.delete({ id: id });
  }
}
