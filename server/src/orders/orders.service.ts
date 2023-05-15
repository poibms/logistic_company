import { cancelOrderType } from './../types/order.types';
import { Drivers } from 'src/drivers/drivers.entity';
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
    try {
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
    } catch (e) {
      throw new BadRequestException('something was wrong while creating order');
    }
  }

  async getAllOrders(status: OrderStasus): Promise<Orders[]> {
    return await this.ordersRepository.getAllOrders(status);
  }

  async getOrderByTrackCode(track_code: string): Promise<Orders> {
    const res = await this.ordersRepository.getOrderByTrackCode(track_code);
    if (!res) {
      throw new BadRequestException('There is no order with such track code');
    }
    return res;
  }

  async getAuthUserOrders(user: User): Promise<Orders[]> {
    return await this.ordersRepository.getAuthUserOrders(user);
  }

  async getOrdersByDriver(user: Drivers): Promise<Orders[]> {
    return await this.ordersRepository.getOrdersByDriver(user);
  }

  async assigntOrderStatus(payload: assignOrderType): Promise<Orders> {
    const { orderId, driverId } = payload;
    await this.driversService.setOrderToDriver(driverId);
    const order = await this.ordersRepository.assigntOrderStatus(
      orderId,
      driverId,
    );
    return order;
  }

  async cancelOrder(id: string, payload: any) {
    const order = await this.ordersRepository.getOrderById(id);
    if (!order) {
      throw new BadRequestException('There is no order with such id');
    } else if (
      order.status === OrderStasus.IN_PROGRESS ||
      order.status === OrderStasus.DONE
    ) {
      throw new BadRequestException('You cannot cancel this order');
    }
    return await this.ordersRepository.cancelOrder(id, payload);
  }

  async completeOrder(id: string, payload: any) {
    const order = await this.ordersRepository.getOrderById(id);
    if (!order) {
      throw new BadRequestException('There is no order with such id');
    } else if (order.status !== OrderStasus.IN_PROGRESS) {
      throw new BadRequestException('You cannot complete this order');
    }
    return await this.ordersRepository.completeOrder(id, payload);
  }
}
