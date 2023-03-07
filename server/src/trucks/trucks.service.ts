import { CreateTruckDto } from './dto/trucks-create.dto';
import { Injectable } from '@nestjs/common';
import { TrucksRepository } from './trucks.repository';
import { FileType } from 'src/types/files.types';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class TrucksService {
  constructor(
    private trucksRepository: TrucksRepository,
    private filesService: FilesService,
  ) {}

  async createTruck(payload: CreateTruckDto, photo: any) {
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
}
