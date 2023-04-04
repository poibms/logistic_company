import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class NewUserOrderDto {
  @IsString()
  name: string;

  @IsNumberString()
  // @IsNumber()
  weight: number;

  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsString()
  @IsOptional()
  image?: string;
}
