import { AuthGuard } from '@nestjs/passport';
import { UserService } from './users.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from './users.entity';
import RoleGuard from 'src/guards/get-role.guard';
import { UserRole } from 'src/types/user.types';

@Controller('users')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @UseGuards(RoleGuard(UserRole.ADMIN))
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }
}
