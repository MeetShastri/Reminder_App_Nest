import { Module } from '@nestjs/common';
import { ReminderController } from './reminder.controller';
import { ReminderService } from './reminder.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ReminderSchema } from './schemas/reminder.schema';
import { UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Reminder', schema: ReminderSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  controllers: [ReminderController],
  providers: [ReminderService],
  exports: [MongooseModule],
})
export class ReminderModule {}
