import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './dto/create.users.dto';
import { Users } from './users.entity';
import * as jwt from 'jsonwebtoken';

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

  async findOne(email: string, password: string) {
    return this.usersRepository.findOne({
      where: {
        email: email,
        password: password,
      },
    });
  }

  async findById(id: number) {
    return await this.usersRepository.findOne(id);
  }

  async loginUser(email: string, password: string) {
    const user = await this.findOne(email, password);
    const SECRETE_KEY_JWT = '171695f6c9200446a95637aa75f2c33e';
    const token = jwt.sign(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          age: user.age,
          sn_administrator: user.roles,
        },
      },
      SECRETE_KEY_JWT,
      {
        expiresIn: 86400,
      },
    );
    return token;
  }
}
