import { NewUserOrderDto } from './dto/orders-create.dto';
import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  async newUserOrder(
    newUserOrderDto: NewUserOrderDto,
    ownerId: string,
  ): Promise<{ message: string }> {
    return await this.ordersRepository.newUserOrder(newUserOrderDto, ownerId);
  }
}
