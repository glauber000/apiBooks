import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBooksDto } from './dto/create.books.dto';
import { Books } from './books.entity';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getHello(): Promise<Books[]> {
    return this.booksService.findAll();
  }

  @Post()
  insert(@Body() createBooksDto: CreateBooksDto): Promise<Books> {
    return this.booksService.insert(createBooksDto);
  }
}
