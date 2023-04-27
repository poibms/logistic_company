import { OrderType } from 'src/types/order.types';
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

  @IsString()
  // @IsNumber()
  order_type: OrderType;

  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsString()
  @IsOptional()
  image?: string;
}
