import { UserRole } from './../types/user.types';
import { Orders } from './../orders/orders.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: UserRole.USER })
  role: string;

  @OneToMany((_type) => Orders, (orders) => orders.ownerId, {
    onDelete: 'CASCADE',
  })
  orders: Orders[];
}
