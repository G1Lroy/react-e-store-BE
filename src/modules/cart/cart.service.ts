import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart } from 'src/entities/cart/cart';
import { CartItem } from 'src/entities/cart/cartItem';

export interface CartResponseMessage {
  message: string;
  status: HttpStatus;
}

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private CartModel: Model<Cart>,
    @InjectModel(CartItem.name) private CartItemModel: Model<CartItem>,
  ) {}

  async createCart(): Promise<string> {
    const cart = await new this.CartModel({
      products: [],
      payment: { total: 0 },
    }).save();
    return cart._id;
  }

  async calculateTotalPayment(cart: Cart): Promise<number> {
    const cartItems = await this.CartItemModel.find({
      _id: { $in: cart.products },
    });
    if (!cartItems.length) return 0;
    return cartItems.reduce((total, cartItem) => total + cartItem.price, 0);
  }

  async checkItemInUserCart(
    itemId: string,
    cartId: string,
  ): Promise<string | null> {
    const existingItem = await this.CartModel.findOne(
      {
        _id: cartId,
        products: itemId,
      },
      { 'products.$': 1 },
    );

    return existingItem ? existingItem.products[0] : null;
  }

  async getCart(cartId: string): Promise<Cart> {
    this.validate_Id(cartId);

    const cart = await this.CartModel.findById(cartId).exec();
    if (!cart) {
      throw new BadRequestException('Cant find cart');
    }
    return cart;
  }

  validate_Id(cartId: string): void {
    if (!Types.ObjectId.isValid(cartId))
      throw new BadRequestException('Corrupted ID');
  }

  async addItemToCart(
    cartId: string,
    cartItem: CartItem,
  ): Promise<CartResponseMessage> {
    const itemId = cartItem._id;
    this.validate_Id(itemId);
    const cart = await this.getCart(cartId);
    // check user cart
    const existingInUserCart = await this.checkItemInUserCart(itemId, cartId);
    if (existingInUserCart) {
      throw new BadRequestException('Item already in cart');
    }
    // check cart items collecton
    const existingInCollection = await this.CartItemModel.findOne({
      _id: itemId,
    });
    if (!existingInCollection) {
      await this.CartItemModel.create(cartItem);
    }
    // update user cart
    cart.products.push(existingInCollection._id);
    cart.payment.total = await this.calculateTotalPayment(cart);

    // save updated cart
    try {
      await cart.save();
      return {
        message: 'Item added to cart',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      if (error.message) {
        throw new BadRequestException(error.message);
      }
    }
  }

  async removeItemFromCart(
    cartId: string,
    cartItemId: string,
  ): Promise<CartResponseMessage> {
    const cart = await this.getCart(cartId);
    this.validate_Id(cartItemId);
    const existingItem = await this.checkItemInUserCart(cartItemId, cartId);

    if (!existingItem) {
      throw new BadRequestException('Item not found in cart');
    }
    // update user cart
    cart.products = cart.products.filter((p) => p.toString() !== cartItemId);
    cart.payment.total = await this.calculateTotalPayment(cart);

    // save user cart
    try {
      await cart.save();
      return {
        message: 'Cart updated, item deleted',
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      if (error.message) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
