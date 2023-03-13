import { UpdateUserDto } from './dto/user-update.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './users.service';
import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { User } from './users.entity';
import RoleGuard from 'src/guards/get-role.guard';
import { UserRole } from 'src/types/user.types';
import { GetUser } from 'src/decorators/get-user.decorator';

@Controller('users')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  @UseGuards(RoleGuard(UserRole.ADMIN))
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Get('/profile')
  async getUserById(@GetUser() user: User): Promise<User> {
    return await this.userService.getUserById(user.id);
  }

  @Put('/')
  async updateProfile(
    @GetUser() user: User,
    @Body() payload: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateProfile(user.id, payload);
  }
}
