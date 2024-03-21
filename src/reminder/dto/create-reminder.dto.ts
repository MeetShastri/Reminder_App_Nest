import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateReminderDto {
  @IsString()
  @IsNotEmpty({ message: 'Title should not be empty' })
  readonly title: string;

  @IsString()
  @IsNotEmpty({ message: 'Description should not be empty' })
  readonly description: string;

  @IsDateString()
  @IsNotEmpty({ message: 'Date is a required field' })
  readonly dueDate: string;

  @IsNotEmpty({
    message: 'You need to give ID of user who wants to create the reminder',
  })
  readonly createdBy: Types.ObjectId;
}
