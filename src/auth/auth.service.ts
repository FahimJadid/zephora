import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserService } from './../user/user.service';
import { NewUserDto } from 'src/user/dto/new-user.dto';
import { UserDetails } from 'src/user/user-details.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  async register(
    newUserDto: Readonly<NewUserDto>,
  ): Promise<UserDetails | null | string> {
    const { email } = newUserDto;

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const createdUser = await this.userService.create(newUserDto);
    return this.userService._getUserDetails(createdUser);
  }
}
