import { Module } from '@nestjs/common';
import { ProductFilterService } from './filters.service';

@Module({
  providers: [ProductFilterService],
  exports: [ProductFilterService],
})
export class ProductFilterModule {}
