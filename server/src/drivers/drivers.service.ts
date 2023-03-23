import { setTruckType } from './../types/drivers.types';
import { FilesService } from './../files/files.service';
import { DriversRepository } from './drivers.repository';
import { Injectable } from '@nestjs/common';
import { Drivers } from './drivers.entity';
import { CreateDriverDto } from './dto/drivers-create.dto';
import { FileType } from 'src/types/files.types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DriversService {
  constructor(
    private dirversRepository: DriversRepository,
    private filesService: FilesService,
  ) {}

  async createDriver(payload: CreateDriverDto, photo: any): Promise<Drivers> {
    const { password } = payload;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const driverPhoto = await this.filesService.createFile(
      FileType.DRIVERS,
      photo,
    );

    return await this.dirversRepository.createDriver({
      ...payload,
      password: hashedPassword,
      photo: driverPhoto,
    });
  }

  async getAllDrivers(): Promise<Drivers[]> {
    return await this.dirversRepository.getAllDrivers();
  }

  async deleteDriverById(id: string): Promise<{ message: string }> {
    return await this.dirversRepository.deleteDriverById(id);
  }

  async setTruckToDriver(payload: setTruckType) {
    return await this.dirversRepository.setTruckToDriver(payload);
  }
}
