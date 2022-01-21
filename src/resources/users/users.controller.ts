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
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Post()
  @HttpCode(StatusCodes.CREATED)
  async create(@Body() user: User) {
    return await this.usersService.create(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user: User | undefined = await this.usersService.findOne(id);
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatedUser: User) {
    updatedUser.id = id;
    const user = await this.usersService.update(updatedUser);
    if (user) {
      return user;
    }
    throw new NotFoundException();
  }

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
