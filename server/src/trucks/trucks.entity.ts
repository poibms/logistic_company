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

  @Column({ unique: true })
  plate: string;

  @Column({ unique: true })
  vin: string;

  @Column({ unique: true })
  trailer_vin: string;

  @Column()
  trailer_height: string;

  @Column()
  trailer_width: string;

  @Column()
  trailer_long: string;

  @Column()
  docs_img: string;

  @OneToOne(() => Drivers, (drivers) => drivers.id)
  @JoinColumn()
  driverId: Drivers;
}
