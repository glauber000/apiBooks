import { Books } from 'src/books/books.entity';
import { Users } from 'src/users/users.entity';

export class CreateReservesDto {
  id?: number;
  date: Date;
  user: Users;
  book: Books;
}
