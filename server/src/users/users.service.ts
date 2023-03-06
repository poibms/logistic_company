import { UserRepository } from 'src/users/users.repository';
import { Injectable } from '@nestjs/common';
import { User } from './users.entity';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAllUsers();
  }
}
