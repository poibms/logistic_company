import { Trucks } from 'src/tracks/trucks.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export class Drivers {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  surname: number;

  @Column()
  age: number;

  @Column()
  photo: any;

  @OneToOne((_type) => Trucks, (truck) => truck.driverId)
  truckId: string;
}
