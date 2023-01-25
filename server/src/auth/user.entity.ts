// import { Task } from 'src/tasks/tasks.entity';
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

  // @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  // task: Task[];
}
