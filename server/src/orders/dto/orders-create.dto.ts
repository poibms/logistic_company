import { IsNumber, IsString } from 'class-validator';

export class NewUserOrderDto {
  @IsString()
  cargo_name: string;

  @IsNumber()
  weight: number;

  @IsString()
  from: string;

  @IsString()
  to: string;
}
