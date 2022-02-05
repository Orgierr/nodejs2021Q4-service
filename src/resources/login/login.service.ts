import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Crypt } from 'src/crypt/crypt';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { TokenToResponse } from 'src/types/types';
@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private crypt: Crypt,
    private jwtService: JwtService,
  ) {}

  /**
   * Find user by login and password and return jwt
   * token
   * @param  login - user login(string)
   * @param  password  - user password (string)
   * @returns  jwt token (TokenToResponse)
   */
  async login(login: string, password: string): Promise<TokenToResponse> {
    const user: User | undefined = await this.usersRepository.findOne({
      where: {
        login: login,
      },
    });
    if (user) {
      const isPassword: boolean = await this.crypt.checkPassword(
        user.password,
        password,
      );
      if (!isPassword) {
        throw new ForbiddenException();
      }
      return {
        token: this.jwtService.sign({
          userId: user.id,
          login: user.login,
        }),
      };
    }
    throw new ForbiddenException();
  }
}
