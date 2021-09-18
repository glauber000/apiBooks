import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Books } from './books.entity';
import { CreateBooksDto } from './dto/create.books.dto';

@Injectable()
export class BooksService {
  constructor(
    @Inject('BOOKS_REPOSITORY')
    private booksRepository: Repository<Books>,
  ) {}

  async findAll(): Promise<Books[]> {
    return this.booksRepository.find();
  }

  async insert(createBooksDto: CreateBooksDto): Promise<Books> {
    return this.booksRepository.save(createBooksDto);
  }
}
