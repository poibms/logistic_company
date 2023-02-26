import { Drivers } from 'src/drivers/drivers.entity';
import { User } from 'src/auth/user.entity';
import { OrderStasus } from 'src/types/order.types';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cargo_name: string;

  @Column()
  weight: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column({ default: OrderStasus.NOT_ASSIGNED })
  status: OrderStasus;

  @ManyToOne(() => User, (user) => user.orders)
  // @Column()
  ownerId: string;

  // @Column({ nullable: true )
  @ManyToOne(() => Drivers, (drivers) => drivers.orders)
  driverId: string;
}
