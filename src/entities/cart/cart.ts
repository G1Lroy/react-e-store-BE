import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CartItem } from './cartItem';

@Schema()
export class Cart extends Document {
  @Prop({ type: [{ type: 'ObjectId', ref: 'SingleProduct' }] })
  products: CartItem[];

  @Prop({ type: { total: Number } })
  payment: { total: number };
}

export const CartSchema = SchemaFactory.createForClass(Cart);
