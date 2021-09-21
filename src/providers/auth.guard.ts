import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { EnumRole } from '../users/enums/user.enum';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.replace('Bearer ', '');
    const SECRETE_KEY_JWT = '171695f6c9200446a95637aa75f2c33e';
    const res = jwt.verify(token, SECRETE_KEY_JWT) as {
      user: {
        id: 1;
      };
    };
    const user = await this.findUserById(res.user.id);
    console.log(EnumRole.ADMIN);
    console.log(user.roles);
    if (user.roles == EnumRole.ADMIN) return true;
    else return false;
  }

  private async findUserById(id: number) {
    return this.usersService.findById(id);
  }
}
