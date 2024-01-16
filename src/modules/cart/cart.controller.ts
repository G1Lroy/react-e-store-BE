import {
  Controller,
  Post,
  Param,
  Body,
  Delete,
  Get,
  ValidationPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItem } from 'src/entities/cart/cartItem';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':cartId')
  async getCart(@Param('cartId') cartId: string) {
    return this.cartService.getCart(cartId);
  }

  @Post(':cartId')
  async addItemToCart(
    @Param('cartId') cartId: string,
    @Body() cartItem: CartItem,
  ) {
    return this.cartService.addItemToCart(cartId, cartItem);
  }

  @Delete(':cartId')
  async removeItemFromCart(
    @Param('cartId') cartId: string,
    @Body() cartItemId: { _id: string },
  ) {
    return this.cartService.removeItemFromCart(cartId, cartItemId._id);
  }
}
