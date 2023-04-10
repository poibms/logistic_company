import { CreateTruckDto } from './dto/trucks-create.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { TrucksRepository } from './trucks.repository';
import { FileType } from 'src/types/files.types';
import { FilesService } from 'src/files/files.service';
import { Trucks } from './trucks.entity';

@Injectable()
export class TrucksService {
  constructor(
    private trucksRepository: TrucksRepository,
    private filesService: FilesService,
  ) {}

  async createTruck(payload: CreateTruckDto, photo: any): Promise<Trucks> {
    const truckImage = await this.filesService.createFile(
      FileType.TRUCKS,
      photo,
    );
    return await this.trucksRepository.createTruck({
      year: +payload.year,
      loadCapacity: +payload.loadCapacity,
      ...payload,
      photo: truckImage,
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
    return await this.trucksRepository.delteTruckById(id);
  }

  async updateTruck(payload: any): Promise<Trucks> {
    return await this.trucksRepository.updateTruck(payload);
  }
}
