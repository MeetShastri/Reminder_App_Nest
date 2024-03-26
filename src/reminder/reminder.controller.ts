import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { CreateReminderDto } from './dto/create-reminder.dto';
import { UpdateReminderDto } from './dto/update-reminder.dto';

@Controller('reminder')
export class ReminderController {
  constructor(private reminderService: ReminderService) {}

  @Post('addreminder')
  async createReminder(
    @Body(new ValidationPipe()) reminder: CreateReminderDto,
  ) {
    return this.reminderService.createReminder(reminder);
  }

  @Get(':id')
  async findReminder(@Param('id') id: string) {
    return this.reminderService.findReminder(id);
  }

  @Patch(':reminderId')
  async updateReminder(
    @Body() updateReminder: UpdateReminderDto,
    @Param('reminderId') reminderId: string,
  ) {
    return this.reminderService.updateReminder(updateReminder, reminderId);
  }

  @Delete(':reminderId')
  async deleteReminder(@Param('reminderId') reminderId: string) {
    return this.reminderService.deleteReminder(reminderId);
  }

  @Get('upcomingreminder/:id')
  async upcomingReminders(@Param('id') id: string) {
    return this.reminderService.upcomingReminders(id);
  }

  @Get('pushnotification/:id')
  async pushNotification(@Param('id') id: string) {
    return this.reminderService.pushNotification(id);
  }
}
