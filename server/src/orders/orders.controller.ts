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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Orders } from './orders.entity';
import RoleGuard from 'src/guards/get-role.guard';
import { assignOrderType, OrderStasus } from 'src/types/order.types';
import { User } from 'src/users/users.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('orders')
@UseGuards(AuthGuard())
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('/')
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
  @UseGuards(RoleGuard(UserRole.ADMIN))
  async getAllOrders(@Query('status') status: OrderStasus): Promise<Orders[]> {
    return this.ordersService.getAllOrders(status);
  }

  @Get('/userorders')
  async getAuthUserOrders(@GetUser() user: User): Promise<Orders[]> {
    return this.ordersService.getAuthUserOrders(user);
  }

  @Put('/')
  @UseGuards(RoleGuard(UserRole.ADMIN))
  async assigntOrderStatus(@Body() payload: assignOrderType): Promise<Orders> {
    return this.ordersService.assigntOrderStatus(payload);
  }
}
