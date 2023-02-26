import { NewUserOrderDto } from './dto/orders-create.dto';
import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Orders } from './orders.entity';
import { assignOrderType } from 'src/types/order.types';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  async newUserOrder(
    newUserOrderDto: NewUserOrderDto,
    ownerId: string,
  ): Promise<Orders> {
    return await this.ordersRepository.newUserOrder(newUserOrderDto, ownerId);
  }

  async getAllNotAssigntOrders(): Promise<Orders[]> {
    return await this.ordersRepository.getAllNotAssigntOrders();
  }

  async assigntOrderStatus(
    payload: assignOrderType,
  ): Promise<{ message: string }> {
    const { orderId, driverId } = payload;
    return await this.ordersRepository.assigntOrderStatus(orderId, driverId);
  }
}
