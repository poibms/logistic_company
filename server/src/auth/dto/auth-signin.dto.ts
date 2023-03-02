import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
} from 'class-validator';

export class AuthSignInDto {
  @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  @IsString()
  @IsEmail()
  @Matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, {
    message: '"Email" field entered incorrectly',
  })
  email: string;

  @ApiProperty({ example: '11111111', description: 'User password' })
  @IsString()
  @MinLength(7)
  @MaxLength(32)
  password: string;
}
