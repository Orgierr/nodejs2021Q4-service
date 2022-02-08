import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Crypt } from 'src/crypt/crypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponsUserDto } from './dto/respons-user.dto';
import { exceptionMessage } from 'src/common/constants';
import { UserResponsePipe } from 'src/pipes/user-response.pipe';

const returnedColumn: (keyof User)[] = ['id', 'login', 'name'];

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private userResponsePipe: UserResponsePipe,
    private crypt: Crypt,
  ) {
    (async () => {
      const userExist: User | undefined = await this.usersRepository.findOne({
        login: 'admin',
      });
      if (!userExist) {
        this.usersRepository.save({
          login: 'admin',
          password: await this.crypt.getPasswordHash('admin'),
          name: 'Foo',
        });
      }
    })();
  }

  /**
   * Add new user in db
   * @param user - new user (User)
   * @returns user to response Promise(ResponsUserDto)
   */
  async create(user: CreateUserDto): Promise<ResponsUserDto> {
    const userExist: User | undefined = await this.usersRepository.findOne({
      login: user.login,
    });
    if (!userExist) {
      user.password = await this.crypt.getPasswordHash(user.password);
      return this.userResponsePipe.transform(
        await this.usersRepository.save(user),
      );
    }
    throw new ConflictException(exceptionMessage.loginUsed);
  }

  /**
   * Get all users
   *@returns all users Promise(Users[])
   */
  findAll(): Promise<User[]> {
    return this.usersRepository.find({ select: returnedColumn });
  }

  /**
   * Get user by id
   * @param  id - user id (string)
   * @returns user by id  Promise(User | undefined)
   */

  async findOne(id: string): Promise<User> {
    const user: User | undefined = await this.usersRepository.findOne({
      select: returnedColumn,
      where: { id: id },
    });
    if (user) {
      return user;
    }
    throw new NotFoundException(exceptionMessage.noFoundUser);
  }

  /**
   * Update user
   * @param  updatedUser - new user data (UpdateUserDto)
   * @param  id - user id (string)
   * @returns  user to response Promise(SelectUserDto)
   */
  async update(
    updatedUser: UpdateUserDto,
    id: string,
  ): Promise<ResponsUserDto> {
    const userExist: User | undefined = await this.usersRepository.findOne({
      login: updatedUser.login,
    });
    if (!userExist) {
      updatedUser.password = await this.crypt.getPasswordHash(
        updatedUser.password,
      );

      const result: UpdateResult = await this.usersRepository
        .createQueryBuilder()
        .update(User)
        .set(updatedUser)
        .where({ id: id })
        .returning('*')
        .execute();
      if (result.affected) {
        return this.userResponsePipe.transform(result.raw[0] as User);
      }
      throw new ConflictException(exceptionMessage.loginUsed);
    }
    throw new NotFoundException(exceptionMessage.noFoundUser);
  }

  /**
   * Delete user by id
   * @param id - user id (string)
   */
  async remove(id: string): Promise<void> {
    const result: DeleteResult = await this.usersRepository.delete({ id: id });
    if (!result.affected) {
      throw new NotFoundException(exceptionMessage.noFoundUser);
    }
  }
}
