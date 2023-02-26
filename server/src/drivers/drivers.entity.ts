import { Orders } from 'src/orders/orders.entity';
import { Trucks } from 'src/trucks/trucks.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

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

  @OneToOne((_type) => Trucks, (truck) => truck.id)
  @JoinColumn()
  truckId: string;

  @OneToMany(() => Orders, (orders) => orders.driverId)
  orders: Orders[];
}
