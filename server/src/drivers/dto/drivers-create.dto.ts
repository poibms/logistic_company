import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateDriverDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(7)
  @MaxLength(32)
  password: string;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  age: string;

  photo?: string;

  truckId?: string;
}
