import { Orders } from 'src/orders/orders.entity';
import { Trucks } from 'src/trucks/trucks.entity';
import { UserRole } from 'src/types/user.types';
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
  driving_experience: string;

  @Column()
  photo: string;

  @Column()
  docs_img: string;

  @Column({ default: UserRole.DRIVER })
  role: string;

  @Column({ name: 'refreshTokenHash', nullable: true })
  rthash: string;

  @OneToOne(() => Trucks, (truck) => truck.id)
  @JoinColumn()
  truckId: Trucks;

  @OneToMany(() => Orders, (orders) => orders.driverId)
  orders: Orders[];
}
