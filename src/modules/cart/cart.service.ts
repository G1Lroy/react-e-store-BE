import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart, CartItem } from 'src/entities/cart/cart';

// interface CartArgs {
//   cartId: string;
//   itemId: string;
// }

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  async getCart(cartId: string): Promise<Cart> {
    return this.cartModel.findById(cartId).exec();
  }

  async createCart(): Promise<string> {
    const cart = new this.cartModel({
      products: [],
      payment: { total: 0 },
    });
    await cart.save();
    return cart._id;
  }

  async updateTotalPayment(cartId: string): Promise<void> {
    await this.cartModel.findOneAndUpdate(
      { _id: cartId },
      [
        {
          $set: {
            'payment.total': {
              $reduce: {
                input: '$products',
                initialValue: 0,
                in: {
                  $add: [
                    '$$value',
                    { $multiply: ['$$this.price', '$$this.quantity'] },
                  ],
                },
              },
            },
          },
        },
      ],
      { new: true },
    );
  }

  async checkCartAndGetItem(
    cartId: string,
    itemId: string,
  ): Promise<CartItem | null> {
    // Check cart id
    if (!Types.ObjectId.isValid(cartId)) {
      throw new BadRequestException(
        'Corrupted cart ID, id must containe 24 hex symbols [65a134e61208ce9a33186657]',
      );
    }

    const existingCart = await this.cartModel.findById(cartId);
    if (!existingCart) {
      throw new BadRequestException('Cant find cart with id_' + cartId);
    }

    const existingItem = await this.cartModel.findOne(
      { _id: cartId, 'products.id': itemId },
      { 'products.$': 1 },
    );
    if (!existingItem) {
      throw new BadRequestException('Cant find cart item with id_' + itemId);
    }

    // return cart item
    return existingItem.products[0];
  }

  async addItemToCart(cartId: string, cartItem: CartItem): Promise<{}> {
    const { id } = cartItem;
    const existingItem = await this.checkCartAndGetItem(cartId, id);

    if (existingItem) {
      throw new BadRequestException(`Item already in cart. ID: ${id}`);
    }

    const cart = await this.cartModel.findByIdAndUpdate(
      cartId,
      { $addToSet: { products: cartItem } },
      { new: true },
    );
    await this.updateTotalPayment(cartId);

    return {
      message: 'Item add to cart',
      status: HttpStatus.CREATED,
      obj: cart.products,
      total: cart.payment.total,
    };
  }

  async removeItemFromCart(cartId: string, cartItemId: string): Promise<{}> {
    const cartItem = await this.checkCartAndGetItem(cartId, cartItemId);

    const updateCart = await this.cartModel.findByIdAndUpdate(
      cartId,
      { $pull: { products: { id: cartItem.id } } },
      { new: true },
    );
    await this.updateTotalPayment(cartId);
    return {
      message: 'Cart Update, item deleted',
      status: HttpStatus.CREATED,
      prodocts: updateCart.products,
      total: updateCart.payment.total,
    };
  }
}
