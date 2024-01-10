import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CartItem extends Document {
  @Prop()
  id: number;

  @Prop()
  title: string;

  @Prop()
  productImage: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number | string;

  @Prop()
  size: string;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);
