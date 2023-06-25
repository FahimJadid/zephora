import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { NewUserDto } from './../user/dto/new-user.dto';
import { ExistingUserDto } from './../user/dto/existing-user.dto';
import { UserService } from './../user/user.service';
import { UserDetails } from 'src/user/user-details.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Hashes the provided password using bcrypt with a salt of 12 rounds
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  // Registers a new user with the provided user data
  async register(newUserDto: Readonly<NewUserDto>): Promise<UserDetails | any> {
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

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetails | null> {
    // Find the user by email
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // // Check if the provided password matches the hashed password
    const isMatch = await this.matchPassword(password, user.password);

    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return this.userService._getUserDetails(user);
  }

  async login(
    existingUserDto: ExistingUserDto,
  ): Promise<{ token: string } | null> {
    const { email, password } = existingUserDto;

    const user = await this.validateUser(email, password);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const jwt = await this.jwtService.signAsync({ user });

    // Return the generated token
    return { token: jwt };
  }
}
