import { UserRole } from './../types/user.types';
import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async signUp(authSignUpDto: AuthSignUpDto): Promise<User> {
    try {
      const { password } = authSignUpDto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = this.create({
        ...authSignUpDto,
        password: hashedPassword,
      });

      const countOfUsers = await this.countUser();
      if (countOfUsers === 0) {
        return await this.registerAdmin(user);
      }

      await this.save(user);
      return user;
    } catch (error) {
      //duplicate email
      if (error.code === '23505') {
        throw new ConflictException('Username with such Email already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async countUser(): Promise<number> {
    return await this.count();
  }

  async registerAdmin(user: User) {
    const admin = { ...user, role: UserRole.ADMIN };
    await this.save(admin);
    return admin;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.findOneBy({ email });
  }
}
