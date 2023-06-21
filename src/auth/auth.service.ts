import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }
}
