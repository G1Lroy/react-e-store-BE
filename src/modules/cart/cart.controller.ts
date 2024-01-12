import { Controller, Post, Param, Body, Delete, Get } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItem } from 'src/entities/cart/cart';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get(':cartId')
  async getCart(@Param('cartId') cartId: string) {
    return this.cartService.getCart(cartId);
  }

  @Post(':cartId/add-item')
  async addItemToCart(
    @Param('cartId') cartId: string,
    @Body() cartItem: CartItem,
  ) {
    return this.cartService.addItemToCart(cartId, cartItem);
  }

  @Delete(':cartId/:cartItemId')
  async removeItemFromCart(
    @Param('cartId') cartId: string,
    @Param('cartItemId') cartItemId: string,
  ) {
    return this.cartService.removeItemFromCart(cartId, cartItemId);
  }
}
