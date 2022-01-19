"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_memory_repository_1 = require("./task.memory.repository");
/**
 * Get all tasks by board id
 * @param boardId - board id (string)
 * @returns  all tasks (Task[])
 */
const getAllTaskByBoardId = (boardId) => task_memory_repository_1.tasksRepo.filter((t) => t.boardId === boardId);
/**
 * Get task by boardId and taskId
 * @param  boardId - board id (string)
 * @param  taskId - task id (string)
 * @returns task (Task | undefined)
 */
const getTaskByBoardIdAndTaskId = (boardId, taskId) => task_memory_repository_1.tasksRepo.find((t) => t.boardId === boardId && t.id === taskId);
/**
 * Add new task in db
 * @param  task - new task
 * @returns task index (number)
 */
const createTasks = (task) => task_memory_repository_1.tasksRepo.push(task);
/**
 * Update task
 * @param updatedTask - new task data (Task)
 * @returns new task data (Task|undefined)
 */
const updateTask = (updatedTask) => {
    const taskIndex = task_memory_repository_1.tasksRepo.findIndex((t) => t.id === updatedTask.id && t.boardId === updatedTask.boardId);
    if (taskIndex !== -1) {
        task_memory_repository_1.tasksRepo[taskIndex] = updatedTask;
        return updatedTask;
    }
    return undefined;
};
/**
 * Delete task by boardId and taskId
 * @param  boardId - board id (string)
 * @param  taskId  - task id (string)
 * @returns array deleted tasks (Task[])
 */
const deleteTask = (boardId, taskId) => {
    const taskIndex = task_memory_repository_1.tasksRepo.findIndex((t) => t.id === taskId && t.boardId === boardId);
    if (taskIndex !== -1) {
        return task_memory_repository_1.tasksRepo.splice(taskIndex, 1);
    }
    return [];
};
exports.default = {
    getAllTaskByBoardId,
    getTaskByBoardIdAndTaskId,
    createTasks,
    updateTask,
    deleteTask,
};
