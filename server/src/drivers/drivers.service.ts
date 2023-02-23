import { DriversRepository } from './drivers.repository';
import { Injectable } from '@nestjs/common';
import { Drivers } from './drivers.entity';
import { CreateDriverDto } from './dto/drivers-create.dto';

@Injectable()
export class DriversService {
  constructor(private dirversRepository: DriversRepository) {}

  async createDriver(payload: CreateDriverDto): Promise<Drivers> {
    return await this.dirversRepository.createDriver(payload);
  }
}
