import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskToResponse } from 'src/types/types';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
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
   * @param  boardId - board id
   * @returns created task  Promise(Task)
   */
  createTasks(createTaskDto: CreateTaskDto, boardId: string): Promise<Task> {
    return this.tasksRepository.save({ ...createTaskDto, boardId: boardId });
  }

  /**
   * Get all tasks by board id
   * @param boardId - board id (string)
   * @returns  all tasks Promise(Task[])
   */
  getAllTaskByBoardId(boardId: string): Promise<Task[]> {
    return this.tasksRepository.find({ where: { boardId: boardId } });
  }

  /**
   * Get task by boardId and taskId
   * @param  boardId - board id (string)
   * @param  taskId - task id (string)
   * @returns task Promise(Task)
   */
  async getTaskByBoardIdAndTaskId(
    boardId: string,
    taskId: string,
  ): Promise<Task> {
    const task: Task | undefined = await this.tasksRepository.findOne({
      where: { id: taskId, boardId: boardId },
    });
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  /**
   * Update task
   * @param updatedTask - new task data (Task)
   * @param taskId -  task id
   * @param boardId - board id
   * @returns new task data Promise(TaskToResponse)
   */
  async updateTask(
    updatedTask: UpdateTaskDto,
    taskId: string,
    boardId: string,
  ): Promise<TaskToResponse> {
    const result: UpdateResult = await this.tasksRepository
      .createQueryBuilder()
      .update(Task)
      .set(updatedTask)
      .where({ id: taskId, boardId: boardId })
      .returning('*')
      .execute();
    if (result.affected) {
      return Task.toResponse(result.raw[0]);
    }
    throw new NotFoundException();
  }

  /**
   * Delete task by boardId and taskId
   * @param  boardId - board id (string)
   * @param  taskId  - task id (string)
   */
  async deleteTask(boardId: string, taskId: string): Promise<void> {
    const result: DeleteResult = await this.tasksRepository.delete({
      boardId: boardId,
      id: taskId,
    });
    if (!result.affected) {
      throw new NotFoundException();
    }
  }
}
