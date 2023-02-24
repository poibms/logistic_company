import { Trucks } from 'src/tracks/trucks.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export class Drivers {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  age: string;

  @Column()
  photo: string;

  @OneToOne((_type) => Trucks, (truck) => truck.driverId, { nullable: true })
  truckId: string;
}
