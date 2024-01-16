import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './../../entities/user/user';
import { CartService } from '../cart/cart.service';

export interface CreateUserMessage {
  status: number;
  message: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly cartService: CartService,
  ) {}

  async createUser(
    email: string,
    password: string,
  ): Promise<CreateUserMessage | unknown> {
    try {
      
      //   TODO hash pass
      const newUser = new this.userModel({
        email,
        password,
        //  create empty cart for each user
        cart_ID: await this.cartService.createCart(),
      });

      await newUser.save();

      return { message: 'User created', status: HttpStatus.CREATED };

    } catch (error: any) {
      if (error.message) throw new BadRequestException(error.message);
    }
  }

  async getUserById(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).exec();
  }
}
