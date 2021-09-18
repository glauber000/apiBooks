import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create.users.dto';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async insert(createUsersDto: CreateUsersDto): Promise<Users> {
    return this.usersRepository.save(createUsersDto);
  }
}
