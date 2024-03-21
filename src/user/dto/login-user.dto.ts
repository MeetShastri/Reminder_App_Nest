import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password should not be empty' })
  readonly password: string;
}
