import { UserRole } from './../types/user.types';
import { NewUserOrderDto } from './dto/orders-create.dto';
import { AuthGuard } from '@nestjs/passport';
import { OrdersService } from './orders.service';
import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Orders } from './orders.entity';
import RoleGuard from 'src/guards/get-role.guard';
import { assignOrderType } from 'src/types/order.types';

@Controller('orders')
@UseGuards(AuthGuard())
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('/')
  async newUserOrder(
    @Body() newUserOrderDto: NewUserOrderDto,
    @GetUser() user: User,
  ): Promise<Orders> {
    console.log(user);
    return await this.ordersService.newUserOrder(newUserOrderDto, user.id);
  }

  @Get('/notassigned')
  @UseGuards(RoleGuard(UserRole.ADMIN))
  async getAllNotAssigntOrders(): Promise<Orders[]> {
    return this.ordersService.getAllNotAssigntOrders();
  }

  @Put('?')
  @UseGuards(RoleGuard(UserRole.ADMIN))
  async assigntOrderStatus(
    @Body() payload: assignOrderType,
  ): Promise<{ message: string }> {
    return this.ordersService.assigntOrderStatus(payload);
  }
}
