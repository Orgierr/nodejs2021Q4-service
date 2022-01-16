"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const boards_1 = require("../../typeorm/entitys/boards");
/**
 * Get all boards
 * @returns all boards (Board[])
 */
const getAll = () => (0, typeorm_1.getRepository)(boards_1.Board)
    .createQueryBuilder('boards')
    .leftJoinAndSelect('boards.columns', 'column')
    .orderBy('column.order', 'ASC')
    .getMany();
/**
 * Add new user in db
 * @param board - board instance (Board)
 * @returns created board (Board)
 */
const createBoard = (board) => (0, typeorm_1.getConnection)().getRepository(boards_1.Board).save(board);
/**
 * Get board by id
 * @param  id - board id (string)
 * @returns  board by id  Promise(Board | undefined)
 */
const getBoardById = (id) => {
    return (0, typeorm_1.getRepository)(boards_1.Board).findOne({ id: id }, { relations: ['columns'] });
};
/**
 * Update board
 * @param updatedBoard - new board data (Board)
 * @returns  new board data Promise(Board|undefined)
 */
const updateBoard = async (updatedBoard) => {
    const result = await (0, typeorm_1.getRepository)(boards_1.Board).save(updatedBoard);
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
const deleteBoardById = async (id) => {
    return (0, typeorm_1.getRepository)(boards_1.Board).delete({ id: id });
};
exports.default = {
    getAll,
    createBoard,
    getBoardById,
    updateBoard,
    deleteBoardById,
};
//# sourceMappingURL=board.service.js.map