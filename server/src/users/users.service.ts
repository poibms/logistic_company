import { UpdateUserDto } from './dto/user-update.dto';
import { UserRepository } from 'src/users/users.repository';
import { Injectable } from '@nestjs/common';
import { User } from './users.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.getUserById(userId, true);
    return user;
  }

  async updateProfile(userId: string, payload: UpdateUserDto): Promise<User> {
    return await this.userRepository.updateProfile(userId, payload);
  }
}
