import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  UseGuards,
  ParseUUIDPipe,
  BadRequestException,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SelectUserDto } from './dto/select-user.dto';
import { ExceptionExample, exceptionMessage } from 'src/common/constants';

@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: [SelectUserDto] })
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiCreatedResponse({ type: SelectUserDto })
  @ApiConflictResponse({ type: ExceptionExample })
  @Post()
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() user: CreateUserDto) {
    return await this.usersService.create(user);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ type: SelectUserDto })
  @ApiNotFoundResponse({ type: ExceptionExample })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  @Get(':id')
  async findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException(exceptionMessage.noValidUserId),
      }),
    )
    id: string,
  ) {
    return await this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Update user by id' })
  @ApiOkResponse({ type: SelectUserDto })
  @ApiNotFoundResponse({ type: ExceptionExample })
  @ApiConflictResponse({ type: ExceptionExample })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  @Put(':id')
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException(exceptionMessage.noValidUserId),
      }),
    )
    id: string,
    @Body() updatedUser: UpdateUserDto,
  ) {
    return await this.usersService.update(updatedUser, id);
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: ExceptionExample })
  @ApiParam({
    name: 'id',
    format: 'uuid',
  })
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(
    @Param(
      'id',
      new ParseUUIDPipe({
        exceptionFactory: () =>
          new BadRequestException(exceptionMessage.noValidUserId),
      }),
    )
    id: string,
  ) {
    return await this.usersService.remove(id);
  }
}
