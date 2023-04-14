import { User } from './../users/users.entity';
import { FileType } from 'src/types/files.types';
import { FilesService } from 'src/files/files.service';
import { NewUserOrderDto } from './dto/orders-create.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Orders } from './orders.entity';
import { assignOrderType, OrderStasus } from 'src/types/order.types';
import { DriversService } from 'src/drivers/drivers.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class OrdersService {
  constructor(
    private ordersRepository: OrdersRepository,
    private driversService: DriversService,
    private filesService: FilesService,
    private mailService: MailService,
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
    const order = await this.ordersRepository.newUserOrder(
      { ...newUserOrderDto, image: orderImagePath },
      ownerId,
    );
    await this.mailService.userCreateOrderNotify(order);
    return order;
  }

  async getAllOrders(status: OrderStasus): Promise<Orders[]> {
    return await this.ordersRepository.getAllOrders(status);
  }

  async getOrderByTrackCode(track_code: string): Promise<Orders> {
    return await this.ordersRepository.getOrderByTrackCode(track_code);
  }

  async getAuthUserOrders(user: User): Promise<Orders[]> {
    return await this.ordersRepository.getAuthUserOrders(user);
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

  async cancelOrder(id: string) {
    const order = await this.ordersRepository.getOrderById(id);
    if (!order) {
      throw new BadRequestException('There is no order with such id');
    } else if (
      order.status === OrderStasus.IN_PROGRESS ||
      order.status === OrderStasus.DONE
    ) {
      throw new BadRequestException('You cannot cancel this order');
    }
    return await this.ordersRepository.cancelOrder(id);
  }
}
