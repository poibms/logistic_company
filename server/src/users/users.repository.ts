import { UpdateUserDto } from './dto/user-update.dto';
import { AuthSignUpDto } from '../auth/dto/auth-signup.dto';
import { UserRole } from '../types/user.types';
import { DataSource, Repository } from 'typeorm';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async signUp(authSignUpDto: AuthSignUpDto): Promise<User> {
    try {
      const user = this.create(authSignUpDto);

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

  async updateProfile(userId: string, payload: UpdateUserDto): Promise<User> {
    try {
      await this.update({ id: userId }, { ...payload });
      return await this.getUserById(userId, true);
    } catch (e) {
      throw new BadRequestException('Something was wrong');
    }
  }

  async logout(userId: string): Promise<boolean> {
    try {
      await this.update({ id: userId }, { rthash: null });
      return true;
    } catch {
      throw new BadRequestException('Something was wrong');
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.find({
        select: ['id', 'name', 'surname', 'phone', 'email', 'orders', 'role'],
      });
      return users;
    } catch (e) {
      throw new BadRequestException('Something was wrong');
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.findOneBy({ email });
  }

  async getUserById(userId: string, exclude = false): Promise<User> {
    if (exclude) {
      return await this.findOne({
        where: { id: userId },
        select: ['id', 'name', 'surname', 'phone', 'email', 'orders', 'role'],
      });
    }
    return await this.findOneBy({ id: userId });
  }

  async updateUserRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt);
    await this.update({ id: userId }, { rthash: hashedRefreshToken });
  }

  async countUser(): Promise<number> {
    return await this.count();
  }

  async registerAdmin(user: User) {
    const admin = { ...user, role: UserRole.ADMIN };
    await this.save(admin);
    return admin;
  }
}
