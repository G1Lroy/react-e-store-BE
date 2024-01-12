import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/modules/user/user.module';
import { ProductListModule } from 'src/modules/products/products.module';
import { CartModule } from 'src/modules/cart/cart.module';
import { CartService } from 'src/modules/cart/cart.service';

require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://ilya:${process.env.MONGO_PASS}@atlascluster.lmcjrbu.mongodb.net/?retryWrites=true&w=majority`,
    ),
    UserModule,
    ProductListModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
