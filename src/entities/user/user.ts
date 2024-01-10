import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Cart } from '../cart/cart';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: 3 })
  password: string;

  @Prop({ type: { type: 'ObjectId', ref: 'Cart' } })
  cart: Cart;
}

export const UserSchema = SchemaFactory.createForClass(User);
