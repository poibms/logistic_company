import { FileType } from 'src/types/files.types';
import { FilesService } from 'src/files/files.service';
import { NewUserOrderDto } from './dto/orders-create.dto';
import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Orders } from './orders.entity';
import { assignOrderType, OrderStasus } from 'src/types/order.types';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private filesService: FilesService,
  ) {}

  async newUserOrder(
    newUserOrderDto: NewUserOrderDto,
    image: string,
    ownerId: string,
  ): Promise<Orders> {
    const orderImagePath = await this.filesService.createFile(
      FileType.ORDERS,
      image,
    );
    return await this.ordersRepository.newUserOrder(
      { ...newUserOrderDto, image: orderImagePath },
      ownerId,
    );
  }

  async getAllOrders(status: OrderStasus): Promise<Orders[]> {
    return await this.ordersRepository.getAllOrders(status);
  }

  async assigntOrderStatus(
    payload: assignOrderType,
  ): Promise<{ message: string }> {
    const { orderId, driverId } = payload;
    return await this.ordersRepository.assigntOrderStatus(orderId, driverId);
  }
}
