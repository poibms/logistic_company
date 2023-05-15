import { Drivers } from 'src/drivers/drivers.entity';
import { UserRole } from './../types/user.types';
import { NewUserOrderDto } from './dto/orders-create.dto';
import { AuthGuard } from '@nestjs/passport';
import { OrdersService } from './orders.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Orders } from './orders.entity';
import RoleGuard from 'src/guards/get-role.guard';
import {
  assignOrderType,
  cancelOrderType,
  OrderStasus,
} from 'src/types/order.types';
import { User } from 'src/users/users.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('/')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  async newUserOrder(
    @Body() newUserOrderDto: NewUserOrderDto,
    @GetUser() user: User,
    @UploadedFiles() files,
  ): Promise<Orders> {
    const { image } = files;
    return await this.ordersService.newUserOrder(
      newUserOrderDto,
      image[0],
      user,
    );
  }

  @Get('/')
  @UseGuards(AuthGuard(), RoleGuard(UserRole.ADMIN))
  async getAllOrders(@Query('status') status: OrderStasus): Promise<Orders[]> {
    return this.ordersService.getAllOrders(status);
  }

  @Get('/bytrack/:code')
  async getOrderByTrackCode(@Param('code') code: string): Promise<Orders> {
    return await this.ordersService.getOrderByTrackCode(code);
  }

  @Get('/userorders')
  @UseGuards(AuthGuard())
  async getAuthUserOrders(@GetUser() user: User): Promise<Orders[]> {
    return this.ordersService.getAuthUserOrders(user);
  }

  @Get('/ordersbydriver')
  @UseGuards(AuthGuard(), RoleGuard(UserRole.DRIVER))
  async getOrdersByDriver(@GetUser() user: Drivers): Promise<Orders[]> {
    return this.ordersService.getOrdersByDriver(user);
  }

  @Put('/')
  @UseGuards(AuthGuard(), RoleGuard(UserRole.ADMIN))
  async assigntOrderStatus(@Body() payload: assignOrderType): Promise<Orders> {
    return this.ordersService.assigntOrderStatus(payload);
  }

  @Put('/cancel/:id')
  @UseGuards(AuthGuard(), RoleGuard(UserRole.ADMIN))
  async cancelOrder(@Param('id') id: string, @Body() payload: cancelOrderType) {
    return this.ordersService.cancelOrder(id, payload);
  }

  @Put('/complete/:id')
  @UseGuards(AuthGuard(), RoleGuard(UserRole.DRIVER))
  async completeOrder(@Param('id') id: string, @Body() payload: any) {
    return this.ordersService.completeOrder(id, payload);
  }
}
