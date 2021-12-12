import { boardsRepo } from './board.memory.repository';
import { tasksRepo } from '../tasks/task.memory.repository';
import { Board } from './board.model';
/**
 * Get all boards
 * @returns all boards (Board[])
 */
const getAll = (): Board[] => boardsRepo;
/**
 * Add new user in db
 * @param board - board instance (Board)
 * @returns board index (number)
 */
const createBoard = (board: Board): number => boardsRepo.push(board);
/**
 * Get board by id
 * @param  id - board id (string)
 * @returns  board by id  (Board | undefined)
 */
const getBoardById = (id: string): Board | undefined => {
  const board = boardsRepo.find((b) => b.id === id);
  return board;
};
/**
 * Update board
 * @param updatedBoard - new board data (Board)
 * @returns  new board data (Board|undefined)
 */
const updateBoard = (updatedBoard: Board): Board | undefined => {
  const boardIndex = boardsRepo.findIndex((b) => b.id === updatedBoard.id);
  if (boardIndex !== -1) {
    boardsRepo[boardIndex] = updatedBoard;
    return updatedBoard;
  }
  return undefined;
};
/**
 * Delete board by id
 * @param  id - board id (string)
 * @returns array deleted boards (Board[])
 */
const deleteBoardById = (id: string): Board[] => {
  const boardIndex = boardsRepo.findIndex((b) => b.id === id);
  if (boardIndex !== -1) {
    for (let index = tasksRepo.length - 1; index >= 0; index -= 1) {
      if (tasksRepo[index]?.boardId === id) {
        tasksRepo.splice(index, 1);
      }
    }

    return boardsRepo.splice(boardIndex, 1);
  }
  return [];
};
export default {
  getAll,
  createBoard,
  getBoardById,
  updateBoard,
  deleteBoardById,
};
