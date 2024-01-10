import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/modules/user/user.module';
import { ProductListModule } from 'src/modules/products/products.module';
import { ProductFilterModule } from 'src/modules/filters/filters.module';

require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://ilya:${process.env.MONGO_PASS}@atlascluster.lmcjrbu.mongodb.net/?retryWrites=true&w=majority`,
    ),
    UserModule,
    ProductListModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
