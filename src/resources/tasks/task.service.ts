import { tasksRepo } from './task.memory.repository';
import { Task } from './task.model';

/**
 * Get all tasks by board id
 * @param boardId - board id (string)
 * @returns  all tasks (Task[])
 */
const getAllTaskByBoardId = (boardId: string): Task[] =>
  tasksRepo.filter((t) => t.boardId === boardId);
/**
 * Get task by boardId and taskId
 * @param  boardId - board id (string)
 * @param  taskId - task id (string)
 * @returns task (Task | undefined)
 */
const getTaskByBoardIdAndTaskId = (
  boardId: string,
  taskId: string
): Task | undefined =>
  tasksRepo.find((t) => t.boardId === boardId && t.id === taskId);
/**
 * Add new task in db
 * @param  task - new task
 * @returns task index (number)
 */
const createTasks = (task: Task): number => tasksRepo.push(task);
/**
 * Update task
 * @param updatedTask - new task data (Task)
 * @returns new task data (Task|undefined)
 */
const updateTask = (updatedTask: Task) => {
  const taskIndex = tasksRepo.findIndex(
    (t) => t.id === updatedTask.id && t.boardId === updatedTask.boardId
  );
  if (taskIndex !== -1) {
    tasksRepo[taskIndex] = updatedTask;
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
const deleteTask = (boardId: string, taskId: string): Task[] => {
  const taskIndex = tasksRepo.findIndex(
    (t) => t.id === taskId && t.boardId === boardId
  );
  if (taskIndex !== -1) {
    return tasksRepo.splice(taskIndex, 1);
  }
  return [];
};
export default {
  getAllTaskByBoardId,
  getTaskByBoardIdAndTaskId,
  createTasks,
  updateTask,
  deleteTask,
};
