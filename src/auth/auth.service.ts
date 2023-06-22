import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UserDetails } from './../user/user-details.interface';
import { NewUserDto } from './../user/dto/new-user.dto';
import { ExistingUserDto } from './../user/dto/existing-user.dto';
import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  // Hashes the provided password using bcrypt with a salt of 12 rounds
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  // Registers a new user with the provided user data
  async register(
    newUserDto: Readonly<NewUserDto>,
  ): Promise<UserDetails | null | string> {
    const { email, password } = newUserDto;

    // Check if a user with the provided email already exists
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.CONFLICT,
      );
    }

    // Hash the password
    const hashedPassword = await this.hashPassword(password);

    // Create the new user with the hashed password
    const createdUser = await this.userService.create({
      ...newUserDto,
      password: hashedPassword,
    });

    // Return the user details
    return this.userService._getUserDetails(createdUser);
  }

  async matchPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
