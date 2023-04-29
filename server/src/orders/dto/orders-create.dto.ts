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
  @IsOptional()
  image?: string;
}
