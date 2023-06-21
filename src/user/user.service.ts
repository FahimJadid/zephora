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

  _getUserDetails(user: User): UserDetails {
    const { name, email } = user;
    return { name, email };
  }

  async create(newUserDto: NewUserDto): Promise<User> {
    const { name, email, password } = newUserDto;
    // const hashedPassword = await this.hashPassword(password);
    const createdUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
    });

    return createdUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }
}
