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
    const newTruck = this.create(payload);
    await this.save(newTruck);
    return await this.getTruckById(newTruck.id);
  }

  async getAllTrucks(): Promise<Trucks[]> {
    return await this.find({ relations: ['driverId'] });
  }

  async setTruckToDriver(payload: setTruckType) {
    try {
      const { driverId, truckId } = payload;
      return this.update({ id: truckId }, { driverId: driverId });
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
}
