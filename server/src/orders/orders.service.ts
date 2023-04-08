import { User } from './../users/users.entity';
import { FileType } from 'src/types/files.types';
import { FilesService } from 'src/files/files.service';
import { NewUserOrderDto } from './dto/orders-create.dto';
import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Orders } from './orders.entity';
import { assignOrderType, OrderStasus } from 'src/types/order.types';
import { DriversService } from 'src/drivers/drivers.service';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private driversService: DriversService,
    private filesService: FilesService,
  ) {}

  async newUserOrder(
    newUserOrderDto: NewUserOrderDto,
    image: string,
    ownerId: User,
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

  async getAuthUserOrders(user: User): Promise<Orders[]> {
    return await this.ordersRepository.getAuthUserOrders(user);
    // return (await orders).filter((order) => order.ownerId.id == user.id);
  }

  async assigntOrderStatus(payload: assignOrderType): Promise<Orders> {
    const { orderId, driverId } = payload;
    await this.driversService.setOrderToDriver(orderId);
    const order = await this.ordersRepository.assigntOrderStatus(
      orderId,
      driverId,
    );
    return order;
  }
}
