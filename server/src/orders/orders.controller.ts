import { NewUserOrderDto } from './dto/orders-create.dto';
import { AuthGuard } from '@nestjs/passport';
import { OrdersService } from './orders.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('orders')
@UseGuards(AuthGuard())
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('/create')
  async newUserOrder(
    @Body() newUserOrderDto: NewUserOrderDto,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    console.log(user);
    return await this.ordersService.newUserOrder(newUserOrderDto, user.id);
  }
}
