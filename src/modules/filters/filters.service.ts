import { Injectable } from '@nestjs/common';
import { PipelineStage } from 'mongoose';
import { ProductQueryParams } from '../products/products.controller';

@Injectable()
export class ProductFilterService {
  getSortOptions(queryParams: Partial<ProductQueryParams>) {
    const { _field, _maxPrice, _minPrice, _sizes, _order } = queryParams;

    // take products[] for actions
    const options: PipelineStage[] = [{ $unwind: '$products' }];

    // sort by field and order
    if (_order || _field) {
      options.push({
        $sort: {
          [`products.${_field || 'price'}`]: _order === 'desc' ? -1 : 1,
        },
      });
    }

    // filter by price range
    if (_maxPrice || _minPrice) {
      options.push({
        $match: {
          'products.price': {
            // TODO get max\min possible product price
            $gte: Number(_minPrice) || 1,
            $lte: Number(_maxPrice) || 100,
          },
        },
      });
    }

    // filter by chosen sizes
    if (_sizes.length) {
      // ...productList?_sizes=41,12,55
      
      const sizesArr = _sizes.split(',');
      options.push({
        $match: {
          'products.shoesSize.size': { $in: [...sizesArr] },
        },
      });
    }

    // By no params return List with max price First
    if (!Object.values(queryParams).length) {
      options.push({ $sort: { 'products.price': -1 } });
    }

    // push filtered\sorted products[] to productList
    options.push({ $group: { _id: '$_id', products: { $push: '$products' } } });

    return options;
  }
}
