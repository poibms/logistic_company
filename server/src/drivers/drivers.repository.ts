import { setTruckType } from './../types/drivers.types';
import { Drivers } from 'src/drivers/drivers.entity';
import { DataSource, Repository } from 'typeorm';
import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { CreateDriverDto } from './dto/drivers-create.dto';

@Injectable()
export class DriversRepository extends Repository<Drivers> {
  constructor(private dataSource: DataSource) {
    super(Drivers, dataSource.createEntityManager());
  }

  async createDriver(payload: CreateDriverDto): Promise<Drivers> {
    try {
      const newDriver = this.create(payload);
      await this.save(newDriver);
      return await this.getDriverByEmail(newDriver.email);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('Driver with such Email already exist');
      } else {
        throw new BadRequestException(
          'error while creating driver. Check ur input data',
        );
      }
    }
  }

  async getAllDrivers(): Promise<Drivers[]> {
    return await this.find({ relations: ['truckId', 'orders'] });
  }

  async deleteDriverById(id: string): Promise<{ message: string }> {
    try {
      await this.delete({ id });
      return { message: 'driver was succesfully deleted ' };
    } catch (e) {
      throw new BadRequestException('something was wrong');
    }
  }

  async setDriverToTruck(payload: setTruckType) {
    try {
      const { driverId, truckId } = payload;
      await this.update({ id: driverId }, { truckId: truckId });
      return await this.getDriverById(driverId);
    } catch (e) {
      throw new BadRequestException(
        'something was wrong while updating driver',
      );
    }
  }

  async unSetDriverToTruck(payload: setTruckType) {
    try {
      const { driverId, truckId } = payload;
      await this.update({ id: driverId }, { truckId: null });
      return await this.getDriverById(driverId);
    } catch (e) {
      throw new BadRequestException(
        'something was wrong while updating driver',
      );
    }
  }

  async updateDriver(payload: any) {
    try {
      const { id } = payload;
      await this.update({ id: id }, payload);
      return await this.getDriverById(id);
    } catch (e) {
      throw new BadRequestException(
        'something was wrong while updating driver',
      );
    }
  }

  async setOrderToDriver(orderId: string, driverId: string) {
    try {
      // await this.update({ id: driverId }, { orders: orderId });
      return await this.getDriverById(driverId);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(
        'something was wrong while updating driver',
      );
    }
  }

  async getDriverByEmail(email: string): Promise<Drivers> {
    try {
      return this.findOne({
        where: {
          email,
        },
        relations: ['truckId', 'orders'],
      });
    } catch (e) {
      throw new BadRequestException('something was wrong');
    }
  }

  async getDriverById(id: string): Promise<Drivers> {
    try {
      return this.findOne({
        where: {
          id,
        },
        relations: ['truckId', 'orders'],
      });
    } catch (e) {
      throw new BadRequestException('something was wrong');
    }
  }
}
