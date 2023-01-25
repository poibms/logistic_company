import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';

export class AuthSignInDto {
  @IsString()
  @IsEmail()
  @Matches(/^\S+@\S+\.\S+$/g, {
    message: '"Email" field entered incorrectly',
  })
  email: string;

  @IsString()
  @MinLength(7)
  @MaxLength(32)
  password: string;
}
