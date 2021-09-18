import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BooksController } from './books.controller';
import { booksProviders } from './books.providers';
import { BooksService } from './books.service';

@Module({
  controllers: [BooksController],
  imports: [DatabaseModule],
  providers: [...booksProviders, BooksService],
})
export class BooksModule {}
