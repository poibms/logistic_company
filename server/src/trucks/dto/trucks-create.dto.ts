import { IsString } from 'class-validator';

export class CreateTruckDto {
  @IsString()
  name: string;

  @IsString()
  model: string;

  year: number;

  loadCapacity: number;

  photo?: string;

  driverId?: string;
}
