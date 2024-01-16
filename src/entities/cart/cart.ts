import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Cart extends Document {
  @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'CartItem' })
  products: string[];

  @Prop({ type: { total: Number } })
  payment: { total: number };
}

export const CartSchema = SchemaFactory.createForClass(Cart);
