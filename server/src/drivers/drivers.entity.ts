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

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  age: string;

  @Column()
  photo: string;

  @OneToOne(() => Trucks, (truck) => truck.id)
  @JoinColumn()
  truckId: string;

  @OneToMany(() => Orders, (orders) => orders.driverId)
  orders: Orders[];
}
