import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { StatusCodes } from 'http-status-codes';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post('/boards/:boardId/tasks')
  @HttpCode(StatusCodes.CREATED)
  async createTasks(@Param('boardId') boardId: string, @Body() task: Task) {
    task.boardId = boardId;
    return await this.tasksService.createTasks(task);
  }

  @Get('/boards/:boardId/tasks')
  async getAllTaskByBoardId(@Param('boardId') boardId: string) {
    return await this.tasksService.getAllTaskByBoardId(boardId);
  }

  @Get('/boards/:boardId/tasks/:taskId')
  async getTaskByBoardIdAndTaskId(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ) {
    const task = await this.tasksService.getTaskByBoardIdAndTaskId(
      boardId,
      taskId,
    );
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  @Put('/boards/:boardId/tasks/:taskId')
  async updateTask(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body() updatedTask: Task,
  ) {
    updatedTask.id = taskId;
    updatedTask.boardId = boardId;
    const task = await this.tasksService.updateTask(updatedTask);
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  @Delete('/boards/:boardId/tasks/:taskId')
  @HttpCode(StatusCodes.CREATED)
  async deleteTask(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ) {
    const result = await this.tasksService.deleteTask(boardId, taskId);
    if (!result.affected) {
      throw new NotFoundException();
    }
  }
}
