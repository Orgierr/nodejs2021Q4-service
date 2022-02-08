import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { exceptionMessage } from 'src/common/constants';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Board } from '../boards/entities/board.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  /**
   * Add new task in db
   * @param  createTaskDto - new task
   * @param  boardId - board id
   * @returns created task  Promise(Task)
   */
  async createTasks(
    createTaskDto: CreateTaskDto,
    boardId: string,
  ): Promise<Task> {
    const board: Board | undefined = await this.boardRepository.findOne(
      boardId,
    );
    if (board) {
      return await this.tasksRepository.save({
        ...createTaskDto,
        boardId: boardId,
      });
    }
    throw new NotFoundException(exceptionMessage.noFoundBoard);
  }

  /**
   * Get all tasks by board id
   * @param boardId - board id (string)
   * @returns  all tasks Promise(Task[])
   */
  async getAllTaskByBoardId(boardId: string): Promise<Task[]> {
    return await this.tasksRepository.find({ where: { boardId: boardId } });
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
      throw new NotFoundException(exceptionMessage.noFoundTask);
    }
    return task;
  }

  /**
   * Update task
   * @param updatedTask - new task data (Task)
   * @param taskId -  task id
   * @param boardId - board id
   * @returns new task data Promise(Task)
   */
  async updateTask(
    updatedTask: UpdateTaskDto,
    taskId: string,
    boardId: string,
  ): Promise<Task> {
    const result: UpdateResult = await this.tasksRepository
      .createQueryBuilder()
      .update(Task)
      .set(updatedTask)
      .where({ id: taskId, boardId: boardId })
      .returning('*')
      .execute();
    if (result.affected) {
      return result.raw[0] as Task;
    }
    throw new NotFoundException(exceptionMessage.noFoundTask);
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
      throw new NotFoundException(exceptionMessage.noFoundTask);
    }
  }
}
