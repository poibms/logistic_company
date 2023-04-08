import { User } from './../users/users.entity';
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
    ownerId: User,
  ): Promise<Orders> {
    try {
      const newOreder = this.create({ ...newUserOrderDto, ownerId: ownerId });
      await this.save(newOreder);
      return this.getOrderById(newOreder.id);
    } catch (e) {
      console.log(e);
    }
  }

  async getAllOrders(status = undefined): Promise<Orders[]> {
    try {
      if (status) {
        return await this.findBy({ status: status });
      }
      return await this.find({ relations: ['ownerId', 'driverId'] });
    } catch (e) {
      console.log(e);
      throw new BadRequestException(
        `There is no order with such status: ${status}`,
      );
    }
  }

  async getAuthUserOrders(user: User): Promise<Orders[]> {
    try {
      return await this.find({
        where: { ownerId: { id: user.id } },
        relations: ['ownerId', 'driverId'],
      });
    } catch (e) {
      console.log(e);
      throw new BadRequestException(
        `There is no order with such status: ${status}`,
      );
    }
  }

  async assigntOrderStatus(orderId: string, driverId: string): Promise<Orders> {
    try {
      await this.update(
        { id: orderId },
        { driverId: driverId, status: OrderStasus.IN_PROGRESS },
      );
      return this.getOrderById(orderId);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(
        'an error occurred while placing the order, please check the correctness of the entered data',
      );
    }
  }

  async getOrderById(id: string): Promise<Orders> {
    try {
      return this.findOne({
        where: {
          id,
        },
        relations: ['ownerId', 'driverId'],
      });
    } catch (e) {
      throw new BadRequestException('something was wrong');
    }
  }

  // async setOrderToDriver(driverId: string, orderId: string) {
  //   try {
  //     await this.update({ id: driverId }, { orders: orderId });
  //     return await this.getDriverById(driverId);
  //   } catch (e) {
  //     throw new BadRequestException(
  //       'something was wrong while updating driver',
  //     );
  //   }
  // }
}
