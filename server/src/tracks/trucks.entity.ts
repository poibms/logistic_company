import { Drivers } from 'src/drivers/drivers.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

@Entity()
export class Trucks {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  model: number;

  @Column()
  year: number;

  @Column({ name: 'load_capacity' })
  loadCapacity: number;

  @Column()
  photo: string;

  @OneToOne((_type) => Drivers, (drivers) => drivers.truckId, {
    nullable: true,
  })
  driverId: string;
}
