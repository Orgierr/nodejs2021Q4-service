import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  /**
   * Add new task in db
   * @param  createTaskDto - new task
   * @returns created task  Promise(Task)
   */
  createTasks(createTaskDto: CreateTaskDto) {
    return this.tasksRepository.save(createTaskDto);
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
  async updateTask(updatedTask: UpdateTaskDto) {
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
