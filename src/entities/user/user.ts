import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, minlength: 3 })
  password: string;

  @Prop({ required: true })
  cart_ID: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
