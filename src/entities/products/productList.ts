import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SingleProduct } from './singleProduct';

@Schema()
export class ProductList extends Document {
  @Prop()
  products: SingleProduct[];
}

export const ProductListSchema = SchemaFactory.createForClass(ProductList);
