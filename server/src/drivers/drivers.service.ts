import { MailService } from './../mail/mail.service';
import { setTruckType } from './../types/drivers.types';
import { FilesService } from './../files/files.service';
import { DriversRepository } from './drivers.repository';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Drivers } from './drivers.entity';
import { CreateDriverDto } from './dto/drivers-create.dto';
import { FileType } from 'src/types/files.types';
import * as bcrypt from 'bcrypt';
import { TrucksRepository } from 'src/trucks/trucks.repository';

@Injectable()
export class DriversService {
  constructor(
    private dirversRepository: DriversRepository,
    private trucksRepository: TrucksRepository,
    private filesService: FilesService,
    private mailService: MailService,
  ) {}

  async createDriver(payload: CreateDriverDto, photo: any): Promise<Drivers> {
    const { password } = payload;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const driverPhoto = await this.filesService.createFile(
      FileType.DRIVERS,
      photo,
    );

    const driver = await this.dirversRepository.createDriver({
      ...payload,
      password: hashedPassword,
      photo: driverPhoto,
    });
    // console.log(
    //   await this.mailService.driverCredsNotification(driver, password),
    // );
    return driver;
  }

  async getAllDrivers(): Promise<Drivers[]> {
    return await this.dirversRepository.getAllDrivers();
  }

  async deleteDriverById(id: string): Promise<{ message: string }> {
    return await this.dirversRepository.deleteDriverById(id);
  }

  async updateDriver(payload: any): Promise<Drivers> {
    return await this.dirversRepository.updateDriver(payload);
  }

  async setDriverToTruck(payload: setTruckType) {
    const driver = await this.dirversRepository.setDriverToTruck(payload);
    await this.trucksRepository.setTruckToDriver(payload);
    return driver;
  }

  async unSetDriverToTruck(payload: setTruckType) {
    const driver = await this.dirversRepository.unSetDriverToTruck(payload);
    await this.trucksRepository.unSetDriverToTruck(payload);
    return driver;
  }

  async setOrderToDriver(driverId: string) {
    const driver = await this.dirversRepository.getDriverById(driverId);
    if (!driver.truckId) {
      throw new BadRequestException(
        'You cannot assign order on this driver, because he does not have a truck',
      );
    }
    return driver;
  }
}
