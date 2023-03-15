import { UserRole } from './../types/user.types';
import { NewUserOrderDto } from './dto/orders-create.dto';
import { AuthGuard } from '@nestjs/passport';
import { OrdersService } from './orders.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Orders } from './orders.entity';
import RoleGuard from 'src/guards/get-role.guard';
import { assignOrderType, OrderStasus } from 'src/types/order.types';
import { User } from 'src/users/users.entity';

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

  @Get('/')
  @UseGuards(RoleGuard(UserRole.ADMIN))
  async getAllOrders(@Query('status') status: OrderStasus): Promise<Orders[]> {
    return this.ordersService.getAllOrders(status);
  }

  @Put('?')
  @UseGuards(RoleGuard(UserRole.ADMIN))
  async assigntOrderStatus(
    @Body() payload: assignOrderType,
  ): Promise<{ message: string }> {
    return this.ordersService.assigntOrderStatus(payload);
  }
}
