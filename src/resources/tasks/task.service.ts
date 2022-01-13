import { DeleteResult, getRepository } from 'typeorm';
import { Task } from '../../typeorm/entitys/tasks';

/**
 * Get all tasks by board id
 * @param boardId - board id (string)
 * @returns  all tasks Promise(Task[])
 */
const getAllTaskByBoardId = (boardId: string): Promise<Task[]> =>
  getRepository(Task).find({ where: { boardId: boardId } });

/**
 * Get task by boardId and taskId
 * @param  boardId - board id (string)
 * @param  taskId - task id (string)
 * @returns task Promise(Task | undefined)
 */
const getTaskByBoardIdAndTaskId = (
  boardId: string,
  taskId: string
): Promise<Task | undefined> =>
  getRepository(Task).findOne({
    where: { id: taskId, boardId: boardId },
  });

/**
 * Add new task in db
 * @param  task - new task
 * @returns created task  Promise(Task)
 */
const createTasks = (task: Task): Promise<Task> =>
  getRepository(Task).save(task);
/**
 * Update task
 * @param updatedTask - new task data (Task)
 * @returns new task data Promise(Task|undefined)
 */
const updateTask = async (updatedTask: Task) => {
  const result = await getRepository(Task).update(updatedTask.id, updatedTask);

  if (result.affected) {
    return Task.toResponse(updatedTask);
  }
  return undefined;
};
/**
 * Delete task by boardId and taskId
 * @param  boardId - board id (string)
 * @param  taskId  - task id (string)
 * @returns  deleted result Promise(DeleteResult)
 */
const deleteTask = (boardId: string, taskId: string): Promise<DeleteResult> =>
  getRepository(Task).delete({ boardId: boardId, id: taskId });
export default {
  getAllTaskByBoardId,
  getTaskByBoardIdAndTaskId,
  createTasks,
  updateTask,
  deleteTask,
};
