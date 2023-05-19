import { IsNumber } from 'class-validator';

export class CompleteOrderDto {
  @IsNumber()
  distance: number;

  @IsNumber()
  fuel: number;

  @IsNumber()
  price: number;
}
