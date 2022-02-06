import { PickType } from '@nestjs/swagger';
import { User } from 'src/resources/users/entities/user.entity';

export class LoginDto extends PickType(User, ['password', 'login'] as const) {}
