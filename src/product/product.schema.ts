import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 0 })
  quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
