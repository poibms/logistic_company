import { NewUserOrderDto } from './dto/orders-create.dto';
import { Orders } from 'src/orders/orders.entity';
import { DataSource, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderStasus } from 'src/types/order.types';
import { stat } from 'fs';

@Injectable()
export class OrdersRepository extends Repository<Orders> {
  constructor(private dataSource: DataSource) {
    super(Orders, dataSource.createEntityManager());
  }

  async newUserOrder(
    newUserOrderDto: NewUserOrderDto,
    ownerId: string,
  ): Promise<Orders> {
    try {
      console.log({ ...newUserOrderDto, ownerId: ownerId });
      const newOreder = this.create({ ...newUserOrderDto, ownerId: ownerId });
      return await this.save(newOreder);
    } catch (e) {
      console.log(e);
    }
  }

  async getAllOrders(status = undefined): Promise<Orders[]> {
    try {
      if (status) {
        return await this.findBy({ status: status });
      }
      return await this.find();
    } catch (e) {
      console.log(e);
      throw new BadRequestException(
        `There is no order with such status: ${status}`,
      );
    }
  }

  async assigntOrderStatus(orderId, driverId): Promise<{ message: string }> {
    try {
      await this.update(
        { id: orderId },
        { driverId: driverId, status: OrderStasus.IN_PROGRESS },
      );
      return { message: 'order updated successfully' };
    } catch (e) {
      console.log(e);
      throw new BadRequestException(
        'an error occurred while placing the order, please check the correctness of the entered data',
      );
    }
  }
}
