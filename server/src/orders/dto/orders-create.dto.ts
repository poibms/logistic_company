import { CargoType } from 'src/types/order.types';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class NewUserOrderDto {
  @IsString()
  name: string;

  @IsNumberString()
  weight: number;

  @IsNumberString()
  distance: number;

  @IsNumberString()
  // @IsNumber()
  price: number;

  @IsNumberString()
  volume: number;

  @IsString()
  cargo_type: CargoType;

  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsString()
  date_of_the_order: string;

  @IsString()
  expected_delivery_date: string;

  @IsString()
  @IsOptional()
  image?: string;
}
