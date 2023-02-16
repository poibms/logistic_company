import { NewUserOrderDto } from './dto/orders-create.dto';
import { Orders } from 'src/orders/orders.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
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
      const newOreder = this.create({ ...newUserOrderDto, ownerId });
      await this.save(newOreder);
      return { message: 'success created order' };
    } catch (e) {
      console.log(e);
    }
  }

  async getAllNotAssigntOrders(): Promise<Orders[]> {
    try {
      return this.findBy({ status: OrderStasus.NOT_ASSIGNED });
    } catch (e) {
      console.log(e);
    }
  }
}
