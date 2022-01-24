import { IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class UpdateUserDto extends User {
  @IsString()
  login: string;

  @IsString()
  password: string;

  @IsString()
  name: string;
}
