import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class CartItem extends Document {
  // @Prop({ required: true })
  // id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  productImage: string[];

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, type: Number })
  quantity: number;

  @Prop({ required: true })
  size: string;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);
