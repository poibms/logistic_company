import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';

export class AuthSignUpDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  phone: string;

  @IsString()
  @IsEmail()
  @Matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, {
    message: '"Email" field entered incorrectly',
  })
  email: string;

  @IsString()
  @MinLength(7)
  @MaxLength(32)
  password: string;
}