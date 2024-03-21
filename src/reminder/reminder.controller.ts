import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { CreateReminderDto } from './dto/create-reminder.dto';

@Controller('reminder')
export class ReminderController {
  constructor(private reminderService: ReminderService) {}

  @Post('addreminder')
  async createReminder(
    @Body(new ValidationPipe()) reminder: CreateReminderDto,
  ) {
    return this.reminderService.createReminder(reminder);
  }
}
