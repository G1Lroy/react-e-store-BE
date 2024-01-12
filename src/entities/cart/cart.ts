import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export interface CartItem {
  id: string;
  title: string;
  productImage: string;
  price: number;
  quantity: number;
  size: string;
}

@Schema()
export class Cart extends Document {
  @Prop({ required: true })
  products: CartItem[];

  @Prop({ type: { total: Number } })
  payment: { total: number };
}

export const CartSchema = SchemaFactory.createForClass(Cart);
