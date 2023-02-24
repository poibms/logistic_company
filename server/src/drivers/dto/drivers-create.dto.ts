import { IsString } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsString()
  age: string;

  photo?: string;

  truckId?: string;
}
