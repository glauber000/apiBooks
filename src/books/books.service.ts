import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Books } from './books.entity';
import { CreateBooksDto } from './dto/create.books.dto';
import { UpdateBooksDto } from './dto/update.books.dto';

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

  async findOne(createBooksDto: CreateBooksDto): Promise<Books> {
    return this.booksRepository.findOne(createBooksDto);
  }

  async update(updateBooksDto: UpdateBooksDto, book: Books): Promise<Books> {
    return this.booksRepository.save({
      ...book,
      ...updateBooksDto,
    });
  }
}
