import { Module } from '@nestjs/common';
import { ReminderController } from './reminder.controller';
import { ReminderService } from './reminder.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReminderSchema } from './schemas/reminder.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Reminder', schema: ReminderSchema }]),
  ],
  controllers: [ReminderController],
  providers: [ReminderService],
})
export class ReminderModule {}
