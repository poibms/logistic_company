import { IsNumber, IsString } from 'class-validator';

export class CompleteOrderDto {
  @IsNumber()
  distance: number;

  @IsNumber()
  fuel: number;

  @IsNumber()
  price: number;

  @IsString()
  actual_delivery_date: string;
}
