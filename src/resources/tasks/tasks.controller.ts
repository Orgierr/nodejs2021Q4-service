import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
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
  ApiParam,
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
  @ApiNotFoundResponse({ type: ExceptionExample })
  @ApiParam({
    name: 'boardId',
    format: 'uuid',
  })
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
  @ApiParam({
    name: 'boardId',
    format: 'uuid',
  })
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
  @ApiParam({
    name: 'boardId',
    format: 'uuid',
  })
  @ApiParam({
    name: 'taskId',
    format: 'uuid',
  })
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
    return await this.tasksService.getTaskByBoardIdAndTaskId(boardId, taskId);
  }

  @ApiOperation({ summary: 'Update task by taskId' })
  @ApiOkResponse({ type: Task })
  @ApiNotFoundResponse({ type: ExceptionExample })
  @ApiParam({
    name: 'boardId',
    format: 'uuid',
  })
  @ApiParam({
    name: 'taskId',
    format: 'uuid',
  })
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
    return await this.tasksService.updateTask(updatedTask, taskId, boardId);
  }

  @ApiOperation({ summary: 'Delete task by taskId' })
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: ExceptionExample })
  @ApiParam({
    name: 'boardId',
    format: 'uuid',
  })
  @ApiParam({
    name: 'taskId',
    format: 'uuid',
  })
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
    return await this.tasksService.deleteTask(boardId, taskId);
  }
}
