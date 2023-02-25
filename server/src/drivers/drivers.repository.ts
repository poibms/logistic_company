import { Drivers } from 'src/drivers/drivers.entity';
import { DataSource, Repository } from 'typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';
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
      return newDriver;
    } catch (e) {
      console.log(e);
      throw new BadRequestException(
        'error while creating driver. Check ur input data',
      );
    }
  }

  async getAllDrivers(): Promise<Drivers[]> {
    return await this.find();
  }

  async deleteDriverById(id: string): Promise<{ message: string }> {
    try {
      await this.delete({ id });
      return { message: 'driver was succesfully deleted ' };
    } catch (e) {
      throw new BadRequestException('something was wrong');
    }
  }
}
