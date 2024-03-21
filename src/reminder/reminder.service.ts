import { Injectable } from '@nestjs/common';
import { Reminder } from './schemas/reminder.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ReminderService {
  constructor(
    @InjectModel(Reminder.name)
    private reminderModel: mongoose.Model<Reminder>,
  ) {}

  async createReminder(reminder: Reminder) {
    const newReminder = await this.reminderModel.create(reminder);
    return {
      message: 'Reminder added Successfully',
      statusCode: 201,
      newReminder,
    };
  }
}
