import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AggregateOptions, Model, PipelineStage } from 'mongoose';
import { ProductList } from 'src/entities/products/productList';
import { SingleProduct } from 'src/entities/products/singleProduct';
import { productListMock } from 'src/mock-data/productList';
import { ProductFilterService } from '../filters/filters.service';

@Injectable()
export class ProductListService {
  constructor(
    @InjectModel(ProductList.name) private productListModel: Model<ProductList>,
    private readonly productFilterService: ProductFilterService,
  ) {}
  async createProductList() {
    await this.productListModel.deleteMany({});
    await this.productListModel.create({ products: productListMock });
    return 'Success!';
  }

  async getProductList(queryParams) {
    const aggregationPipeline =
      this.productFilterService.getSortOptions(queryParams);

    const productList = await this.productListModel
      .aggregate(aggregationPipeline)
      .exec();

    return productList;
  }

  async addProduct(newProduct: SingleProduct) {
    const productList = await this.productListModel
      .findOneAndUpdate(
        {},
        { $push: { products: newProduct } },
        { new: true, upsert: true },
      )
      .exec();

    if (!productList) {
      throw new NotFoundException('Product list not found');
    }

    return productList;
  }

  async removeProduct(productId: string) {
    const productList = await this.productListModel
      .findOneAndUpdate(
        {},
        { $pull: { products: { id: productId } } },
        { new: true },
      )
      .exec();

    if (!productList) {
      throw new NotFoundException('Product list not found');
    }

    return productList;
  }
}

// потратил 4+ часа  не работает через sort()
// ебал рот
// const productList = await this.productListModel
//   .findOne({})
//   .sort({ 'products.price': -1 })
//   .exec();

// const sortOptions = this.productFilterService.getSortOptions(
//   sortType,
//   field,
// );
