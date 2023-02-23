import { Orders } from 'src/orders/orders.entity';
import { DataSource, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderStasus } from 'src/types/order.types';

@Injectable()
export class DriversRepository extends Repository<Orders> {
  constructor(private dataSource: DataSource) {
    super(Orders, dataSource.createEntityManager());
  }
}
