import { CargoType } from './../../types/order.types';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateTruckDto {
  @IsString()
  name: string;

  @IsString()
  model: string;

  @IsString()
  truck_type: CargoType;

  @IsNumberString()
  year: number;

  @IsNumberString()
  trailer_volume: number;

  @IsNumberString()
  fuel_consumption: number;

  @IsNumberString()
  loadCapacity: number;

  @IsString()
  plate: string;

  @IsString()
  vin: string;

  @IsString()
  trailer_vin: string;

  @IsString()
  trailer_height: string;

  @IsString()
  trailer_width: string;

  @IsString()
  trailer_long: string;

  @IsOptional()
  docs_img?: string;

  @IsOptional()
  photo?: string;
}
