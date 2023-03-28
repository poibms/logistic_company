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

  @Column({ default: OrderStasus.NOT_ASSIGNED })
  status: OrderStasus;

  @Column()
  @Generated('uuid')
  track_code: string;

  @ManyToOne(() => User, (user) => user.orders)
  // @Column()
  ownerId: string;

  // @Column({ nullable: true )
  @ManyToOne(() => Drivers, (drivers) => drivers.orders)
  driverId: string;
}
