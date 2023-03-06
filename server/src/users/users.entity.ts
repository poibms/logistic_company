import { UserRole } from '../types/user.types';
import { Orders } from '../orders/orders.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ example: '1', description: 'User id' })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({ example: 'Ivan', description: 'User name' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Petrov', description: 'User surname' })
  @Column()
  surname: string;

  @ApiProperty({ example: '+3752957659921', description: 'User phone number' })
  @Column()
  phone: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'User email' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: '11111111', description: 'User password' })
  @Column()
  password: string;

  @ApiProperty({ example: 'USER', description: 'User role' })
  @Column({ default: UserRole.USER })
  role: string;

  @ApiProperty({
    example: '$fsdfnksfsdffewffq',
    description: 'User refresh token',
  })
  @Column({ name: 'refreshTokenHash', nullable: true })
  rthash: string;

  @OneToMany(() => Orders, (orders) => orders.ownerId, {
    onDelete: 'CASCADE',
  })
  orders: Orders[];
}
