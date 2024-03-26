import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async findAll() {
    const users = await this.userModel.find();
    return users;
  }

  async createUser(user: User) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = await this.userModel.create({
        ...user,
        password: hashedPassword,
      });
      return {
        message: 'User Registered Successfully',
        statusCode: 201,
        newUser,
      };
    } catch (error) {
      return {
        message: 'An unexpected error occured',
        statusCode: 500,
        error: error.message,
      };
    }
  }

  async loginUser(userlogin) {
    try {
      const email = userlogin.email;
      const user = await this.userModel.findOne(
        { email },
        'fullName email password',
      );
      if (!user) {
        return {
          message: 'User not found',
          statusCode: 404,
        };
      }
      const match = await bcrypt.compare(userlogin.password, user.password);

      if (!match) {
        throw new UnauthorizedException(
          'Incorrect Password, Please enter the correct password',
        );
      }
      const tokenObject = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      };

      const jwtToken = jwt.sign(tokenObject, process.env.SECRET, {
        expiresIn: '4h',
      });
      return {
        message: 'You are logged in Successfully',
        Token: jwtToken,
        tokenObject: tokenObject,
      };
    } catch (error) {
      return {
        message: 'An unexpected error occured',
        statusCode: 500,
        error: error.message,
      };
    }
  }
}
