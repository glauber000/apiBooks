import { Users } from 'src/users/users.entity';

export class CreateReservesDto {
  id?: number;
  date: Date;
  period: string;
  user: Users;
}
