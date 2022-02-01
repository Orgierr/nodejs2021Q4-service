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
import { ExceptionExample } from 'src/common/constants';

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
    @Param('boardId') boardId: string,
    @Body() task: CreateTaskDto,
  ) {
    task.boardId = boardId;
    return await this.tasksService.createTasks(task);
  }

  @ApiOperation({ summary: 'Get all tasks by boardId' })
  @ApiOkResponse({ type: [Task] })
  @ApiNotFoundResponse({ type: ExceptionExample })
  @Get()
  async getAllTaskByBoardId(@Param('boardId') boardId: string) {
    return await this.tasksService.getAllTaskByBoardId(boardId);
  }

  @ApiOperation({ summary: 'Get  task by taskId' })
  @ApiOkResponse({ type: Task })
  @ApiNotFoundResponse({ type: ExceptionExample })
  @Get(':taskId')
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

  @ApiOperation({ summary: 'Update task by taskId' })
  @ApiOkResponse({ type: Task })
  @ApiNotFoundResponse({ type: ExceptionExample })
  @Put(':taskId')
  async updateTask(
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
    @Body() updatedTask: UpdateTaskDto,
  ) {
    updatedTask.id = taskId;
    updatedTask.boardId = boardId;
    const task = await this.tasksService.updateTask(updatedTask);
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
    @Param('boardId') boardId: string,
    @Param('taskId') taskId: string,
  ) {
    const result = await this.tasksService.deleteTask(boardId, taskId);
    if (!result.affected) {
      throw new NotFoundException();
    }
  }
}
