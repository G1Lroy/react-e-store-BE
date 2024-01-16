import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { UserService } from './user.service';

interface CreateUserDto {
  email: string;
  password: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { password, email } = createUserDto;
    return this.userService.createUser(email, password);
  }

  @Get(':id')
  async getUserById(@Param('id') userId: string) {
    return this.userService.getUserById(userId);
  }
}
