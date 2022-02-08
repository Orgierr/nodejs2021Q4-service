import { PipeTransform, Injectable } from '@nestjs/common';
import { ResponsUserDto } from 'src/resources/users/dto/respons-user.dto';
import { User } from 'src/resources/users/entities/user.entity';

@Injectable()
export class UserResponsePipe implements PipeTransform<User, ResponsUserDto> {
  transform(user: User): ResponsUserDto {
    const { id, name, login } = user;
    return { id, name, login };
  }
}
