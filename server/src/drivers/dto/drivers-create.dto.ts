import { IsNumber, IsString } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsNumber()
  age: number;

  photo?: any;

  truckId?: string;
}
