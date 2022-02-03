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
  UseGuards,
  ParseUUIDPipe,
  BadRequestException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { StatusCodes } from 'http-status-codes';
import { AuthGuard } from 'src/guard/auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { ExceptionExample, exceptionMessage } from 'src/common/constants';

@ApiBearerAuth()
@ApiTags('Tasks')
@UseGuards(AuthGuard)
@Controller('/boards/:boardId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Create task for board' })
  @ApiCreatedResponse({ type: Task })
  @Post()
  @HttpCode(StatusCodes.CREATED)
  async createTasks(
    @Param(
      'boardId',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException(exceptionMessage.noValidBoardId),
      }),
    )
    boardId: string,
    @Body() task: CreateTaskDto,
  ) {
    return await this.tasksService.createTasks(task, boardId);
  }

  @ApiOperation({ summary: 'Get all tasks by boardId' })
  @ApiOkResponse({ type: [Task] })
  @ApiNotFoundResponse({ type: ExceptionExample })
  @Get()
  async getAllTaskByBoardId(
    @Param(
      'boardId',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException(exceptionMessage.noValidBoardId),
      }),
    )
    boardId: string,
  ) {
    return await this.tasksService.getAllTaskByBoardId(boardId);
  }

  @ApiOperation({ summary: 'Get  task by taskId' })
  @ApiOkResponse({ type: Task })
  @ApiNotFoundResponse({ type: ExceptionExample })
  @Get(':taskId')
  async getTaskByBoardIdAndTaskId(
    @Param(
      'boardId',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException(exceptionMessage.noValidBoardId),
      }),
    )
    boardId: string,
    @Param(
      'taskId',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException(exceptionMessage.noValidTaskId),
      }),
    )
    taskId: string,
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

  @ApiOperation({ summary: 'Update task by taskId' })
  @ApiOkResponse({ type: Task })
  @ApiNotFoundResponse({ type: ExceptionExample })
  @Put(':taskId')
  async updateTask(
    @Param(
      'boardId',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException(exceptionMessage.noValidBoardId),
      }),
    )
    boardId: string,
    @Param(
      'taskId',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException(exceptionMessage.noValidTaskId),
      }),
    )
    taskId: string,
    @Body() updatedTask: UpdateTaskDto,
  ) {
    const task = await this.tasksService.updateTask(
      updatedTask,
      taskId,
      boardId,
    );
    if (!task) {
      throw new NotFoundException();
    }
    return task;
  }

  @ApiOperation({ summary: 'Delete task by taskId' })
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: ExceptionExample })
  @Delete(':taskId')
  @HttpCode(StatusCodes.NO_CONTENT)
  async deleteTask(
    @Param(
      'boardId',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException(exceptionMessage.noValidBoardId),
      }),
    )
    boardId: string,
    @Param(
      'taskId',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException(exceptionMessage.noValidTaskId),
      }),
    )
    taskId: string,
  ) {
    const result = await this.tasksService.deleteTask(boardId, taskId);
    if (!result.affected) {
      throw new NotFoundException();
    }
  }
}
