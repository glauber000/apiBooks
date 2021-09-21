import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { ReservesModule } from './reserves/reserves.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, ReservesModule, BooksModule, ConfigurationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
