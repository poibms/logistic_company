import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UserRole } from './../types/user.types';
import { TrucksService } from './trucks.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import RoleGuard from 'src/guards/get-role.guard';
import { CreateTruckDto } from './dto/trucks-create.dto';
import { Trucks } from './trucks.entity';

@Controller('trucks')
@UseGuards(AuthGuard())
export class TrucksController {
  constructor(private trucksService: TrucksService) {}

  @Post('/')
  @UseGuards(RoleGuard(UserRole.ADMIN))
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }]))
  async createDriver(
    @Body() createTruckrDto: CreateTruckDto,
    @UploadedFiles() files,
  ): Promise<Trucks> {
    const { photo } = files;
    return await this.trucksService.createTruck(createTruckrDto, photo[0]);
  }

  @Get('/')
  @UseGuards(RoleGuard(UserRole.ADMIN))
  async getAllTrucks(): Promise<Trucks[]> {
    return await this.trucksService.getAllTrucks();
  }
}
