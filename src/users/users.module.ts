import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  imports: [DatabaseModule],
  providers: [...usersProviders, UsersService],
})
export class UsersModule {}
