import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  /**
   * Add new task in db
   * @param  task - new task
   * @returns created task  Promise(Task)
   */
  createTasks(task: Task) {
    this.tasksRepository.save(task);
  }
  /**
   * Get all tasks by board id
   * @param boardId - board id (string)
   * @returns  all tasks Promise(Task[])
   */
  getAllTaskByBoardId(boardId: string) {
    return this.tasksRepository.find({ where: { boardId: boardId } });
  }
  /**
   * Get task by boardId and taskId
   * @param  boardId - board id (string)
   * @param  taskId - task id (string)
   * @returns task Promise(Task | undefined)
   */
  getTaskByBoardIdAndTaskId(boardId: string, taskId: string) {
    return this.tasksRepository.findOne({
      where: { id: taskId, boardId: boardId },
    });
  }
  /**
   * Update task
   * @param updatedTask - new task data (Task)
   * @returns new task data Promise(Task|undefined)
   */
  async updateTask(updatedTask: Task) {
    const result = await this.tasksRepository.update(
      updatedTask.id,
      updatedTask,
    );
    if (result.affected) {
      return Task.toResponse(updatedTask);
    }
    return undefined;
  }
  /**
   * Delete task by boardId and taskId
   * @param  boardId - board id (string)
   * @param  taskId  - task id (string)
   * @returns  deleted result Promise(DeleteResult)
   */
  deleteTask(boardId: string, taskId: string) {
    return this.tasksRepository.delete({ boardId: boardId, id: taskId });
  }
}
