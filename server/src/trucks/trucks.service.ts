import { DriversRepository } from 'src/drivers/drivers.repository';
import { CreateTruckDto } from './dto/trucks-create.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { TrucksRepository } from './trucks.repository';
import { FileType } from 'src/types/files.types';
import { FilesService } from 'src/files/files.service';
import { Trucks } from './trucks.entity';
import { check } from 'prettier';

@Injectable()
export class TrucksService {
  constructor(
    private trucksRepository: TrucksRepository,
    private driversRepository: DriversRepository,
    private filesService: FilesService,
  ) {}

  async createTruck(
    payload: CreateTruckDto,
    photo: any,
    docs_img: any,
  ): Promise<Trucks> {
    const truckImage = await this.filesService.createFile(
      FileType.TRUCKS,
      photo,
    );

    const truckPts = await this.filesService.createFile(
      FileType.TRUCK_DOC,
      docs_img,
    );
    return await this.trucksRepository.createTruck({
      year: +payload.year,
      loadCapacity: +payload.loadCapacity,
      ...payload,
      photo: truckImage,
      docs_img: truckPts,
    });
  }

  async getAllTrucks(): Promise<Trucks[]> {
    return await this.trucksRepository.getAllTrucks();
  }

  async delteTruckById(id: string): Promise<{ message: string }> {
    const truck = await this.trucksRepository.getTruckById(id);
    if (!truck) {
      throw new BadRequestException('there is no truck with such id');
    }
    if (truck.driverId) {
      const driver = await this.driversRepository.getDriverById(
        truck.driverId.id,
      );
      if (!driver)
        throw new BadRequestException('There is no driver with such id');
      const checkOrders = driver.orders.filter(
        (order) => order.status === 'in_progress',
      );
      if (checkOrders.length > 0)
        throw new BadRequestException(
          'You cannot delete this truck, because the driver has in_progress orders',
        );
      await this.driversRepository.updateDriver({
        id: truck.driverId.id,
        truckId: null,
      });
    }
    return await this.trucksRepository.delteTruckById(id);
  }

  async updateTruck(payload: any): Promise<Trucks> {
    return await this.trucksRepository.updateTruck(payload);
  }
}
