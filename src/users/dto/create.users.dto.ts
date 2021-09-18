import { Reserves } from 'src/reserves/reserves.entity';

export class CreateUsersDto {
  id?: number;
  name: string;
  age: number;
  reserves: Reserves[];
}
