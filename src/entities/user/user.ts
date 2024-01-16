import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true, })
  email: string;

  @Prop({ required: true, minlength: 3 })
  password: string;

  @Prop({
    required: true,
    unique: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'Cart',
  })
  cart_ID: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
