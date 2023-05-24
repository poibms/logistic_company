import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
  IsNumberString,
} from 'class-validator';

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

  @IsNumberString()
  driving_experience: string;

  @IsOptional()
  docs_img?: string;
  @IsOptional()
  photo?: string;

  // truckId?: string;
}
