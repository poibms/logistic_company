import { NewUserOrderDto } from './dto/orders-create.dto';
import { Orders } from 'src/orders/orders.entity';
import { DataSource, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderStasus } from 'src/types/order.types';

@Injectable()
export class OrdersRepository extends Repository<Orders> {
  constructor(private dataSource: DataSource) {
    super(Orders, dataSource.createEntityManager());
  }

  async newUserOrder(
    newUserOrderDto: NewUserOrderDto,
    ownerId: string,
  ): Promise<{ message: string }> {
    try {
      console.log({ ...newUserOrderDto, ownerId: ownerId });
      const newOreder = this.create({ ...newUserOrderDto, ownerId: ownerId });
      await this.save(newOreder);
      return { message: 'success created order' };
    } catch (e) {
      console.log(e);
    }
  }

  async getAllNotAssigntOrders(): Promise<Orders[]> {
    try {
      const orders = await this.findBy({ status: OrderStasus.NOT_ASSIGNED });
      // console.log(orders);
      return orders;
    } catch (e) {
      console.log(e);
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
