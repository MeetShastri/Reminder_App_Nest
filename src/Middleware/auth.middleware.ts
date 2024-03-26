import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}
  async use(req: any, res: any, next: NextFunction) {
    try {
      console.log('Request..');
      if (!req.headers['authorization']) {
        return res.json({
          message: 'Token is required',
        });
      }
      const token = req.headers['authorization'];
      const decoded = jwt.verify(token, process.env.SECRET);
      console.log(decoded);

      const user = await this.userModel.findOne({ id: decoded.id });
      console.log(user);

      if (!user) {
        return res.status(404).json({
          message: 'User not found',
          statusCode: 404,
        });
      }
      const id = req.params.id;
      console.log(id);
      if (req.params.id && String(decoded.id) !== req.params.id) {
        throw new ForbiddenException('You are not allowed');
      }
      return next();
    } catch (error) {
      next(error);
    }
  }
}
