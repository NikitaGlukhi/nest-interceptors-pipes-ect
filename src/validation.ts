import { IsEmail, IsString } from 'class-validator';

export class Validation {
  @IsEmail()
  email: string;

  @IsString()
  name: string;
}
