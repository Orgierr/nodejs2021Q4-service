import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crypt } from 'src/crypt/crypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { exceptionMessage } from 'src/common/constants';

const returnedColumn: (keyof User)[] = ['id', 'login', 'name'];

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private crypt: Crypt,
  ) {
    (async () => {
      const userExist = await this.usersRepository.findOne({ login: 'admin' });
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
   * @returns user to response Promise(User.toResponse)
   */
  async create(user: CreateUserDto) {
    const userExist = await this.usersRepository.findOne({ login: user.login });
    if (!userExist) {
      user.password = await this.crypt.getPasswordHash(user.password);
      return User.toResponse(await this.usersRepository.save(user));
    }
    throw new ConflictException(exceptionMessage.loginUsed);
  }
  /**
   * Get all users
   *@returns all users Promise(Users[])
   */
  findAll() {
    return this.usersRepository.find({ select: returnedColumn });
  }
  /**
   * Get user by id
   * @param  id - user id (string)
   * @returns user by id  Promise(User | undefined)
   */
  findOne(id: string) {
    return this.usersRepository.findOne({
      select: returnedColumn,
      where: { id: id },
    });
  }
  /**
   * Update user
   * @param  updatedUser - new user data (UpdateUserDto)
   * @param  id - user id (string)
   * @returns  user to response Promise(User.toResponse|undefined)
   */
  async update(updatedUser: UpdateUserDto, id: string) {
    const userExist = await this.usersRepository.findOne({
      login: updatedUser.login,
    });
    if (!userExist) {
      updatedUser.password = await this.crypt.getPasswordHash(
        updatedUser.password,
      );

      const result = await this.usersRepository
        .createQueryBuilder()
        .update(User)
        .set(updatedUser)
        .where({ id: id })
        .returning('*')
        .execute();
      if (result.affected) {
        return User.toResponse(result.raw[0]);
      }
      return undefined;
    }
    throw new ConflictException(exceptionMessage.loginUsed);
  }
  /**
   * Delete user by id
   * @param id - user id (string)
   * @returns  deleted result Promise(DeleteResult)
   */
  remove(id: string) {
    return this.usersRepository.delete({ id: id });
  }
}
