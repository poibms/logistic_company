import { CargoType } from './../types/order.types';
import { Drivers } from 'src/drivers/drivers.entity';
import { OrderStasus } from 'src/types/order.types';
import { User } from 'src/users/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Generated,
} from 'typeorm';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  weight: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  image: string;

  @Column()
  distance: number;

  @Column()
  price: number;

  @Column()
  cargo_type: CargoType;

  @Column()
  volume: number;

  @Column({ default: 0 })
  fuel: number;

  @Column({ default: OrderStasus.NOT_ASSIGNED })
  status: OrderStasus;

  @Column({ nullable: true })
  err_message: string;

  @Column()
  @Generated('uuid')
  track_code: string;

  @ManyToOne(() => User, (user) => user.orders)
  // @Column()
  ownerId: User;

  // @Column({ nullable: true )
  @ManyToOne(() => Drivers, (drivers) => drivers.orders)
  driverId: Drivers;
}
