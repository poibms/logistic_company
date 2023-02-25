import { FilesService } from './../files/files.service';
import { DriversRepository } from './drivers.repository';
import { Injectable } from '@nestjs/common';
import { Drivers } from './drivers.entity';
import { CreateDriverDto } from './dto/drivers-create.dto';
import { FileType } from 'src/types/files.types';

@Injectable()
export class DriversService {
  constructor(
    private dirversRepository: DriversRepository,
    private filesService: FilesService,
  ) {}

  async createDriver(payload: CreateDriverDto, photo: any): Promise<Drivers> {
    const driverPhoto = await this.filesService.createFile(
      FileType.DRIVERS,
      photo,
    );

    return await this.dirversRepository.createDriver({
      ...payload,
      photo: driverPhoto,
    });
  }

  async getAllDrivers(): Promise<Drivers[]> {
    return await this.dirversRepository.getAllDrivers();
  }

  async deleteDriverById(id: string): Promise<{ message: string }> {
    return await this.dirversRepository.deleteDriverById(id);
  }
}
