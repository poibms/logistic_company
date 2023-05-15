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

  @IsOptional()
  photo?: string;
}
