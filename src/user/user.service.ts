import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { UserDetails } from './user-details.interface';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  _getUserDetails(user: UserDocument): UserDetails {
    const { name, email } = user;
    return { name, email };
  }
}
