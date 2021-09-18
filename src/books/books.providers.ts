import { Connection } from 'typeorm';
import { Books } from './books.entity';

export const booksProviders = [
  {
    provide: 'BOOKS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Books),
    inject: ['DATABASE_CONNECTION'],
  },
];
