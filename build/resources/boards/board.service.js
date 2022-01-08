"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const board_memory_repository_1 = require("./board.memory.repository");
const task_memory_repository_1 = require("../tasks/task.memory.repository");
/**
 * Get all boards
 * @returns all boards (Board[])
 */
const getAll = () => board_memory_repository_1.boardsRepo;
/**
 * Add new user in db
 * @param board - board instance (Board)
 * @returns board index (number)
 */
const createBoard = (board) => board_memory_repository_1.boardsRepo.push(board);
/**
 * Get board by id
 * @param  id - board id (string)
 * @returns  board by id  (Board | undefined)
 */
const getBoardById = (id) => {
    const board = board_memory_repository_1.boardsRepo.find((b) => b.id === id);
    return board;
};
/**
 * Update board
 * @param updatedBoard - new board data (Board)
 * @returns  new board data (Board|undefined)
 */
const updateBoard = (updatedBoard) => {
    const boardIndex = board_memory_repository_1.boardsRepo.findIndex((b) => b.id === updatedBoard.id);
    if (boardIndex !== -1) {
        board_memory_repository_1.boardsRepo[boardIndex] = updatedBoard;
        return updatedBoard;
    }
    return undefined;
};
/**
 * Delete board by id
 * @param  id - board id (string)
 * @returns array deleted boards (Board[])
 */
const deleteBoardById = (id) => {
    const boardIndex = board_memory_repository_1.boardsRepo.findIndex((b) => b.id === id);
    if (boardIndex !== -1) {
        for (let index = task_memory_repository_1.tasksRepo.length - 1; index >= 0; index -= 1) {
            if (task_memory_repository_1.tasksRepo[index]?.boardId === id) {
                task_memory_repository_1.tasksRepo.splice(index, 1);
            }
        }
        return board_memory_repository_1.boardsRepo.splice(boardIndex, 1);
    }
    return [];
};
exports.default = {
    getAll,
    createBoard,
    getBoardById,
    updateBoard,
    deleteBoardById,
};
