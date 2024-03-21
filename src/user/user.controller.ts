import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers() {
    return this.userService.findAll();
  }

  @Post('register')
  async createUser(@Body(new ValidationPipe()) user: CreateUserDto) {
    return this.userService.createUser(user);
  }

  @Post('login')
  async loginUser(@Body() userlogin: LoginUserDto) {
    return this.userService.loginUser(userlogin);
  }
}
