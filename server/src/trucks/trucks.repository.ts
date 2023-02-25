import { Trucks } from 'src/trucks/trucks.entity';
import { DataSource, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTruckDto } from './dto/trucks-create.dto';

@Injectable()
export class TrucksRepository extends Repository<Trucks> {
  constructor(private dataSource: DataSource) {
    super(Trucks, dataSource.createEntityManager());
  }

  async createTruck(payload: CreateTruckDto): Promise<Trucks> {
    const newTruck = this.create(payload);
    const trucks = await this.save(newTruck);
    console.log(trucks);
    return newTruck;
  }
}
