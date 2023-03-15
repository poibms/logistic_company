import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class NewUserOrderDto {
  @IsString()
  cargo_name: string;

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
