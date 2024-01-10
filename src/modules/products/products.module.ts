import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductListController } from './products.controller';
import { ProductListService } from './products.service';
import {
  ProductList,
  ProductListSchema,
} from 'src/entities/products/productList';
import { ProductFilterModule } from '../filters/filters.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductList.name, schema: ProductListSchema },
    ]),
    ProductFilterModule,
  ],
  controllers: [ProductListController],
  providers: [ProductListService],
})
export class ProductListModule {}
