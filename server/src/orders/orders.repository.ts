import { Drivers } from 'src/drivers/drivers.entity';
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

  async getOrdersByDriver(user: Drivers): Promise<Orders[]> {
    try {
      return await this.find({
        where: { driverId: { id: user.id } },
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
        { driverId: { id: driverId }, status: OrderStasus.IN_PROGRESS },
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

  async getOrderByTrackCode(track_code: string): Promise<Orders> {
    try {
      return this.findOne({
        where: {
          track_code,
        },
        relations: ['ownerId', 'driverId'],
      });
    } catch (e) {
      throw new BadRequestException('something was wrong');
    }
  }

  async cancelOrder(id: string): Promise<Orders> {
    try {
      await this.update({ id: id }, { status: OrderStasus.CANCEL });
      return this.getOrderById(id);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(
        'an error occurred while placing the order, please check the correctness of the entered data',
      );
    }
  }

  async completeOrder(id: string, payload: any): Promise<Orders> {
    try {
      await this.update(
        { id: id },
        {
          status: OrderStasus.DONE,
          price: payload.payload.price,
          distance: payload.payload.distance,
        },
      );
      return this.getOrderById(id);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(
        'an error occurred while placing the order, please check the correctness of the entered data',
      );
    }
  }
}
