"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const tasks_1 = require("../../typeorm/entitys/tasks");
/**
 * Get all tasks by board id
 * @param boardId - board id (string)
 * @returns  all tasks Promise(Task[])
 */
const getAllTaskByBoardId = (boardId) => (0, typeorm_1.getRepository)(tasks_1.Task).find({ where: { boardId: boardId } });
/**
 * Get task by boardId and taskId
 * @param  boardId - board id (string)
 * @param  taskId - task id (string)
 * @returns task Promise(Task | undefined)
 */
const getTaskByBoardIdAndTaskId = (boardId, taskId) => (0, typeorm_1.getRepository)(tasks_1.Task).findOne({
    where: { id: taskId, boardId: boardId },
});
/**
 * Add new task in db
 * @param  task - new task
 * @returns created task  Promise(Task)
 */
const createTasks = (task) => (0, typeorm_1.getRepository)(tasks_1.Task).save(task);
/**
 * Update task
 * @param updatedTask - new task data (Task)
 * @returns new task data Promise(Task|undefined)
 */
const updateTask = async (updatedTask) => {
    const result = await (0, typeorm_1.getRepository)(tasks_1.Task).update(updatedTask.id, updatedTask);
    if (result.affected) {
        return tasks_1.Task.toResponse(updatedTask);
    }
    return undefined;
};
/**
 * Delete task by boardId and taskId
 * @param  boardId - board id (string)
 * @param  taskId  - task id (string)
 * @returns  deleted result Promise(DeleteResult)
 */
const deleteTask = (boardId, taskId) => (0, typeorm_1.getRepository)(tasks_1.Task).delete({ boardId: boardId, id: taskId });
exports.default = {
    getAllTaskByBoardId,
    getTaskByBoardIdAndTaskId,
    createTasks,
    updateTask,
    deleteTask,
};
//# sourceMappingURL=task.service.js.map