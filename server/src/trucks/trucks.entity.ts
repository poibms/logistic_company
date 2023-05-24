import { CargoType } from './../types/order.types';
import { Drivers } from 'src/drivers/drivers.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Trucks {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column({ name: 'load_capacity' })
  loadCapacity: number;

  @Column({ default: CargoType.COMMON_TRAILER })
  truck_type: CargoType;

  @Column()
  fuel_consumption: number;

  @Column()
  trailer_volume: number;

  @Column()
  photo: string;

  @Column()
  plate: string;

  @Column()
  vin: string;

  @Column()
  trailer_vin: string;

  @Column()
  docs_img: string;

  @OneToOne(() => Drivers, (drivers) => drivers.id)
  @JoinColumn()
  driverId: Drivers;
}
