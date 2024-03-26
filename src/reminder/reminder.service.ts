import { Injectable } from '@nestjs/common';
import { Reminder } from './schemas/reminder.schema';
import mongoose from 'mongoose';
import { format } from 'date-fns';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';
import { UpdateReminderDto } from './dto/update-reminder.dto';

@Injectable()
export class ReminderService {
  constructor(
    @InjectModel(Reminder.name)
    private reminderModel: mongoose.Model<Reminder>,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async createReminder(reminder: Reminder) {
    try {
      const newReminder = await this.reminderModel.create(reminder);
      return {
        message: 'Reminder added Successfully',
        statusCode: 201,
        newReminder,
      };
    } catch (error) {
      return {
        message: 'An unexpected error occured',
        statusCode: 500,
        error: error.message,
      };
    }
  }

  async findReminder(id: string) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        return {
          message: 'User not found',
          statusCode: 404,
        };
      }
      const reminder = await this.reminderModel.find({ createdBy: id });
      return {
        message: 'Here are all reminders of User',
        statusCode: 200,
        reminder,
      };
    } catch (error) {
      return {
        message: 'An unexpected error occured',
        statusCode: 500,
        error: error.message,
      };
    }
  }

  async updateReminder(updateReminder: UpdateReminderDto, reminderId: string) {
    try {
      const reminder = await this.reminderModel.findById(reminderId);
      if (!reminder) {
        return {
          message: 'No Reminder found with this id',
          statusCode: 404,
        };
      }
      const updatedReminder = await this.reminderModel.findOneAndUpdate(
        { _id: reminderId },
        { ...updateReminder },
        { new: true },
      );
      return {
        message: 'Reminder Updated successfully',
        statusCode: 200,
        updatedReminder,
      };
    } catch (error) {
      return {
        message: 'An unexpected error occured',
        statusCode: 500,
        error: error.message,
      };
    }
  }

  async deleteReminder(reminderId: string) {
    try {
      const reminder = await this.reminderModel.findById(reminderId);
      if (!reminder) {
        return {
          message: 'Reminder for this id is not found',
          statusCode: 404,
        };
      }
      const deletedReminder =
        await this.reminderModel.findByIdAndDelete(reminderId);
      return {
        message: 'Reminder Deleted Successfully',
        statusCode: 200,
        deletedReminder,
      };
    } catch (error) {
      return {
        message: 'An unexpected error occured',
        statusCode: 500,
        error: error.message,
      };
    }
  }

  async upcomingReminders(id: string) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        return {
          message: 'User not found',
          statusCode: 404,
        };
      }
      const currentDate = new Date();
      const formattedDate = format(currentDate, 'yyyy-MM-dd');
      console.log(formattedDate);

      const upcomingReminder = await this.reminderModel.find({
        createdBy: id,
        dueDate: { $gte: formattedDate },
      });

      return {
        message: 'Here are all upcoming Reminders',
        statusCode: 200,
        upcomingReminder,
      };
    } catch (error) {
      return {
        message: 'An unexpected error occured',
        statusCode: 500,
        error: error.message,
      };
    }
  }

  async pushNotification(id: string) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        return {
          message: 'User not found',
          statusCode: 404,
        };
      }
      const currentDate = new Date();
      const formattedDate = format(currentDate, 'yyyy-MM-dd');
      console.log(formattedDate);

      const remindingMessage = await this.reminderModel.find({
        createdBy: id,
        dueDate: formattedDate,
      });
      if (!remindingMessage) {
        return {
          message: 'There are no reminders to push',
          statusCode: 404,
        };
      }
      remindingMessage.forEach(async (reminder) => {
        console.log(
          `Sending reminder notification for user ${id}: ${reminder.description}`,
        );
      });
      return {
        message: 'Notifications are Sent Successfully to the console!!!',
        statusCode: 200,
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
