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

    await this.mailService.driverCredsNotification(driver, password);

    return driver;
  }

  async getAllDrivers(): Promise<Drivers[]> {
    return await this.dirversRepository.getAllDrivers();
  }

  async getDriverById(id: string): Promise<Drivers> {
    const driver = await this.dirversRepository.getDriverById(id);
    if (!driver) {
      throw new BadRequestException('There is no driver with such id');
    }
    return driver;
  }

  async deleteDriverById(id: string): Promise<{ message: string }> {
    const driver = await this.dirversRepository.getDriverById(id);
    if (!driver) {
      throw new BadRequestException('There is no driver with such id');
    }
    const driverOrders = driver.orders.filter(
      (order) => order.status === 'in_progress',
    );
    if (driverOrders.length > 0) {
      throw new BadRequestException('Cannot delete this driver');
    }
    await this.trucksRepository.updateTruck({
      id: driver.truckId.id,
      driverId: null,
    });
    const res = await this.dirversRepository.deleteDriverById(id);

    return res;
  }

  async updateDriver(payload: any): Promise<Drivers> {
    if (!payload.id) {
      throw new BadRequestException('Please set driver id ');
    }
    const candidate = await this.dirversRepository.getDriverById(payload.id);
    if (!candidate) {
      throw new BadRequestException('There is no driver with such id');
    }
    return await this.dirversRepository.updateDriver(payload);
  }

  async setDriverToTruck(payload: setTruckType) {
    const { driverId, truckId } = payload;
    const candidate = await this.dirversRepository.getDriverById(driverId);
    if (!candidate) {
      throw new BadRequestException('There is no driver with such id');
    }
    if (candidate.truckId) {
      throw new BadRequestException('This driver already has a truck');
    }
    const checkTruck = await this.trucksRepository.getTruckById(truckId);
    if (!checkTruck) {
      throw new BadRequestException('There is no truck with such id');
    }
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
    console.log(driver);
    if (!driver.truckId) {
      throw new BadRequestException(
        'You cannot assign order on this driver, because he does not have a truck',
      );
    }
    return driver;
  }
}
