
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

interface ISize {
  size: string;
  quantity: number;
}

@Schema()
export class SingleProduct extends Document {
  @Prop()
  _id: string;

  @Prop()
  title: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  images: string[];

  @Prop()
  shoesSize: ISize[];
}

export const SingleProductSchema = SchemaFactory.createForClass(SingleProduct);
