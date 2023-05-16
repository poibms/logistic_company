import { Trucks } from 'src/trucks/trucks.entity';
import { DataSource, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTruckDto } from './dto/trucks-create.dto';
import { setTruckType } from 'src/types/drivers.types';

@Injectable()
export class TrucksRepository extends Repository<Trucks> {
  constructor(private dataSource: DataSource) {
    super(Trucks, dataSource.createEntityManager());
  }

  async createTruck(payload: CreateTruckDto): Promise<Trucks> {
    try {
      const newTruck = this.create(payload);
      await this.save(newTruck);
      return await this.getTruckById(newTruck.id);
    } catch (e) {
      throw new BadRequestException(
        'something was wrong while creating driver',
      );
    }
  }

  async getAllTrucks(): Promise<Trucks[]> {
    return await this.find({ relations: ['driverId'] });
  }

  async setTruckToDriver(payload: any) {
    try {
      const { driverId, truckId } = payload;
      return this.update({ id: truckId }, { driverId: driverId });
    } catch (e) {
      throw new BadRequestException(
        'something was wrong while updating driver',
      );
    }
  }

  async unSetDriverToTruck(payload: setTruckType) {
    try {
      const { driverId, truckId } = payload;
      await this.update({ id: truckId }, { driverId: null });
    } catch (e) {
      throw new BadRequestException(
        'something was wrong while updating driver',
      );
    }
  }

  async getTruckById(id: string): Promise<Trucks> {
    try {
      return this.findOne({
        where: {
          id,
        },
        relations: ['driverId'],
      });
    } catch (e) {
      throw new BadRequestException('something was wrong');
    }
  }

  async delteTruckById(id: string): Promise<{ message: string }> {
    try {
      await this.delete({ id });
      return { message: 'truck was succesfully deleted ' };
    } catch (e) {
      throw new BadRequestException('something was wrong');
    }
  }

  async updateTruck(payload: any): Promise<Trucks> {
    try {
      const { id } = payload;
      await this.update({ id: id }, payload);
      return await this.getTruckById(id);
    } catch (e) {
      throw new BadRequestException('something was wrong while updating truck');
    }
  }
}
