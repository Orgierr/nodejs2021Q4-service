import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crypt } from 'src/crypt/crypt';

const returnedColumn: (keyof User)[] = ['id', 'login', 'name'];

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private crypt: Crypt,
  ) {}
  /**
   * Add new user in db
   * @param user - new user (User)
   * @returns user to response Promise(User.toResponse)
   */
  async create(user: User) {
    user.password = await this.crypt.getPasswordHash(user.password);

    return User.toResponse(await this.usersRepository.save(user));
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
   * @param  updatedUser - new user data (User)
   * @returns  user to response Promise(User.toResponse|undefined)
   */
  async update(updatedUser: User) {
    updatedUser.password = await this.crypt.getPasswordHash(
      updatedUser.password,
    );

    const result = await this.usersRepository.update(
      updatedUser.id,
      updatedUser,
    );
    if (result.affected) {
      return User.toResponse(updatedUser);
    }
    return undefined;
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
