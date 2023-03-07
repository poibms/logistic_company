import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateTruckDto {
  @IsString()
  name: string;

  @IsString()
  model: string;

  @IsNumberString()
  year: number;

  @IsNumberString()
  loadCapacity: number;

  @IsOptional()
  photo?: string;
}
