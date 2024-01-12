import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductListService } from './products.service';
import { SingleProduct } from 'src/entities/products/singleProduct';

export interface ProductQueryParams {
  // desc - по убыванию
  //  asc - по возрастанию
  _order: 'desc' | 'asc';
  _field: 'price' | 'id' | 'collectionDate';
  _minPrice: number;
  _maxPrice: number;
  _sizes: string;
}

@Controller('productList')
export class ProductListController {
  constructor(private readonly productService: ProductListService) {}

  @Get()
  async getProductList(@Query() queryParams: Partial<ProductQueryParams>) {
    const productList = await this.productService.getProductList(queryParams);
    return productList;
  }
  @Post('create')
  createProductList() {
    // need once
    return;
    // return this.productService.createProductList();
  }

  @Post('add-new')
  addProduct(@Body() newProduct: SingleProduct) {
    return this.productService.addProduct(newProduct);
  }

  @Delete(':productId')
  removeProduct(@Param('productId') productId: string) {
    return this.productService.removeProduct(productId);
  }
}
