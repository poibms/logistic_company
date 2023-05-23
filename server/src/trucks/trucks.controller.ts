import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UserRole } from './../types/user.types';
import { TrucksService } from './trucks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import RoleGuard from 'src/guards/get-role.guard';
import { CreateTruckDto } from './dto/trucks-create.dto';
import { Trucks } from './trucks.entity';
import { FilesService } from 'src/files/files.service';
import { FileType } from 'src/types/files.types';

@Controller('trucks')
@UseGuards(AuthGuard())
export class TrucksController {
  constructor(
    private trucksService: TrucksService,
    private filesService: FilesService,
  ) {}

  @Post('/')
  @UseGuards(RoleGuard(UserRole.ADMIN))
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'photo', maxCount: 1 },
      { name: 'doc_img', maxCount: 1 },
    ]),
  )
  async createDriver(
    @Body() createTruckrDto: CreateTruckDto,
    @UploadedFiles() files,
  ): Promise<Trucks> {
    const { photo, doc_img } = files;
    console.log(photo);
    console.log(doc_img);
    return await this.trucksService.createTruck(
      createTruckrDto,
      photo[0],
      doc_img[0],
    );
  }

  @Get('/')
  @UseGuards(RoleGuard(UserRole.ADMIN))
  async getAllTrucks(): Promise<Trucks[]> {
    return await this.trucksService.getAllTrucks();
  }

  @Delete('/:id')
  async delteTruckById(@Param('id') id): Promise<{ message: string }> {
    return await this.trucksService.delteTruckById(id);
  }

  @Put('/')
  @UseGuards(RoleGuard(UserRole.ADMIN))
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }]))
  async updateDriver(
    @Body() payload: any,
    @UploadedFiles() files,
  ): Promise<Trucks> {
    console.log(payload);
    console.log(files);
    const { photo } = files;
    if (photo) {
      const driverPhoto = await this.filesService.createFile(
        FileType.TRUCKS,
        photo[0],
      );
      return await this.trucksService.updateTruck({
        ...payload,
        photo: driverPhoto,
      });
    } else {
      return await this.trucksService.updateTruck(payload);
    }
  }
}
