import { PickType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class ResponsUserDto extends PickType(User, [
  'id',
  'login',
  'name',
] as const) {}
