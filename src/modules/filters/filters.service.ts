import { Injectable } from '@nestjs/common';
import { AggregateOptions, PipelineStage } from 'mongoose';
import { ProductQueryParams } from '../products/products.controller';

@Injectable()
export class ProductFilterService {
  getSortOptions(queryParams: ProductQueryParams) {
    console.log(queryParams);
    const { _field, _maxPrice, _minPrice, _sizes, _sortBy } = queryParams;

    const options: PipelineStage[] = [{ $unwind: '$products' }];
    if (_sortBy || _field) {
      options.push({
        $sort: {
          [`products.${_field || 'price'}`]: _sortBy === 'desc' ? -1 : 1,
        },
      });
    } else {
      // default field PRICE, sort max price first
      options.push({ $sort: { 'products.price': -1 } });
    }
    options.push({ $group: { _id: '$_id', products: { $push: '$products' } } });
    return options;
  }
}
