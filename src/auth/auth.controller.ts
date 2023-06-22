import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDto } from './../user/dto/new-user.dto';
import { UserDetails } from 'src/user/user-details.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() newUserDto: NewUserDto,
  ): Promise<UserDetails | null | string> {
    return this.authService.register(newUserDto);
  }
}
