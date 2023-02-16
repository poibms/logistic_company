import { NewUserOrderDto } from './dto/orders-create.dto';
import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Orders } from './orders.entity';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  async newUserOrder(
    newUserOrderDto: NewUserOrderDto,
    ownerId: string,
  ): Promise<{ message: string }> {
    return await this.ordersRepository.newUserOrder(newUserOrderDto, ownerId);
  }

  async getAllNotAssigntOrders(): Promise<Orders[]> {
    return await this.ordersRepository.getAllNotAssigntOrders();
  }
}
