import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class UpdateReminderDto {
  @IsString()
  @IsNotEmpty()
  readonly title?: string;

  @IsString()
  @IsNotEmpty()
  readonly description?: string;

  @IsDateString()
  @IsNotEmpty()
  readonly dueDate?: string;
}
