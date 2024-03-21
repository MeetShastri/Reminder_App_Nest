import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Full Name should not be empty' })
  @MinLength(3, { message: 'FullName must be atleast 3 characters long' })
  readonly fullName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password should not be empty' })
  @MinLength(6, { message: 'Password must be atleast 6 characters long' })
  readonly password: string;
}
