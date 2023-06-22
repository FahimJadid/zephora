// Import the necessary modules and types from the '@nestjs/mongoose' and 'mongoose' libraries
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Define a type that represents a User document (extends User class and mongoose Document)
// UserDocument type is defined as an intersection of User class and the Document type. It represents a document of the User model.
export type UserDocument = User & Document;

// Define a schema for the User model using the @Schema decorator
@Schema()
export class User {
  // Define properties (fields) for the User model using the @Prop decorator

  // 'name' property is a required string
  @Prop({ required: true })
  name: string;

  // 'email' property is a required string and must be unique
  @Prop({ required: true, unique: true })
  email: string;

  // 'password' property is a required string
  @Prop({ required: true })
  password: string;

  // 'createdAt' property is a Date with a default value of the current date and time
  @Prop({ default: Date.now })
  createdAt: Date;

  // 'updatedAt' property is a Date with a default value of the current date and time
  @Prop({ default: Date.now })
  updatedAt: Date;
}

// Create a mongoose schema from the User class using the SchemaFactory
export const UserSchema = SchemaFactory.createForClass(User);
