import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductList } from 'src/entities/products/productList';
import { SingleProduct } from 'src/entities/products/singleProduct';
import { productListMock } from 'src/mock-data/productList';
import { ProductFilterService } from '../filters/filters.service';
import { singleProductMock } from 'src/mock-data/singleProduct';
import { ProductQueryParams } from './products.controller';

@Injectable()

export class ProductListService {
  constructor(
    @InjectModel(ProductList.name) private productListModel: Model<ProductList>,
    // @InjectModel(SingleProduct.name)
    // private singleProduct: Model<SingleProduct>,
    private readonly productFilterService: ProductFilterService,
  ) {}
  async createProductList() {
    await this.productListModel.deleteMany({});
    await this.productListModel.create({ products: productListMock });
    return 'Success!';
  }

  async getProductList(queryParams: Partial<ProductQueryParams>) {
    const aggregationPipeline =
      this.productFilterService.getSortOptions(queryParams);

    const productList = await this.productListModel
      .aggregate(aggregationPipeline)
      .exec();
    return productList;
  }

  async addProduct(newProduct: SingleProduct) {
    
    // new this.singleProduct({})

    const productList = await this.productListModel
      .findOneAndUpdate(
        {},
        // add MOCK OBJ
        { $push: { products: singleProductMock } },
        { new: true, upsert: true },
      )
      .exec();

    if (!productList) {
      throw new NotFoundException('Product list not found');
    }

    return 'Product added!';
  }

  async removeProduct(productId: string) {
    await this.productListModel.updateOne(
      {},
      { $pull: { products: { id: productId } } },
    );

    return productId + ' ' + 'Id remove';
  }
}
