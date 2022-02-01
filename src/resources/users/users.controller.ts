import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/guard/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SelectUserDto } from './dto/select-user.dto';
import { ExceptionExample } from 'src/common/constants';

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
  @Post()
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() user: CreateUserDto) {
    return await this.usersService.create(user);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ type: SelectUserDto })
  @ApiNotFoundResponse({ type: ExceptionExample })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user: User | undefined = await this.usersService.findOne(id);
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  @ApiOperation({ summary: 'Update user by id' })
  @ApiOkResponse({ type: SelectUserDto })
  @ApiNotFoundResponse({ type: ExceptionExample })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updatedUser: UpdateUserDto) {
    const user = await this.usersService.update(updatedUser, id);
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @ApiNoContentResponse()
  @ApiNotFoundResponse({ type: ExceptionExample })
  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const result = await this.usersService.remove(id);
    if (!result.affected) {
      throw new NotFoundException();
    }
    return;
  }
}
