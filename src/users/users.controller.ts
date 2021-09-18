import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUsersDto } from './dto/create.users.dto';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Post()
  insert(@Body() createUsersDto: CreateUsersDto): Promise<Users> {
    return this.usersService.insert(createUsersDto);
  }
}
