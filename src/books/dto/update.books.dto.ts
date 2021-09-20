import { PartialType } from '@nestjs/mapped-types';
import { CreateBooksDto } from './create.books.dto';

export class UpdateBooksDto extends PartialType(CreateBooksDto) {}
