import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { PhotoModule } from './reserves/reserves.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, PhotoModule, BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
