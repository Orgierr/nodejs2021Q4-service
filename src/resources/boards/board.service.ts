import { DeleteResult, getConnection, getRepository } from 'typeorm';
import { Board } from '../../typeorm/entitys/boards';

/**
 * Get all boards
 * @returns all boards (Board[])
 */
const getAll = (): Promise<Board[]> =>
  getRepository(Board)
    .createQueryBuilder('boards')
    .leftJoinAndSelect('boards.columns', 'column')
    .orderBy('column.order', 'ASC')
    .getMany();

/**
 * Add new user in db
 * @param board - board instance (Board)
 * @returns created board (Board)
 */
const createBoard = (board: Board): Promise<Board> =>
  getConnection().getRepository(Board).save(board);
/**
 * Get board by id
 * @param  id - board id (string)
 * @returns  board by id  Promise(Board | undefined)
 */
const getBoardById = (id: string): Promise<Board | undefined> => {
  return getRepository(Board).findOne({ id: id }, { relations: ['columns'] });
};
/**
 * Update board
 * @param updatedBoard - new board data (Board)
 * @returns  new board data Promise(Board|undefined)
 */
const updateBoard = async (updatedBoard: Board): Promise<Board | undefined> => {
  const result = await getRepository(Board).save(updatedBoard);

  if (result.id) {
    return updatedBoard;
  }
  return undefined;
};
/**
 * Delete board by id
 * @param  id - board id (string)
 * @returns  deleted result Promise(DeleteResult)
 */
const deleteBoardById = async (id: string): Promise<DeleteResult> => {
  return getRepository(Board).delete({ id: id });
};
export default {
  getAll,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoardById,
};
