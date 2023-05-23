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
      { name: 'docs_img', maxCount: 1 },
    ]),
  )
  async createDriver(
    @Body() createTruckrDto: CreateTruckDto,
    @UploadedFiles() files,
  ): Promise<Trucks> {
    const { photo, docs_img } = files;
    console.log(photo);
    console.log(docs_img);
    return await this.trucksService.createTruck(
      createTruckrDto,
      photo[0],
      docs_img[0],
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
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'photo', maxCount: 1 },
      { name: 'docs_img', maxCount: 1 },
    ]),
  )
  async updateTruck(
    @Body() payload: any,
    @UploadedFiles() files,
  ): Promise<Trucks> {
    const { photo, docs_img } = files;
    if (photo && docs_img) {
      const trucksImg = await this.filesService.createFile(
        FileType.TRUCKS,
        photo[0],
      );
      const trucksDocs = await this.filesService.createFile(
        FileType.TRUCK_DOC,
        docs_img[0],
      );
      return await this.trucksService.updateTruck({
        ...payload,
        photo: trucksImg,
        docs_img: trucksDocs,
      });
    } else if (photo) {
      const trucksImg = await this.filesService.createFile(
        FileType.TRUCKS,
        photo[0],
      );
      return await this.trucksService.updateTruck({
        ...payload,
        photo: trucksImg,
      });
    } else if (docs_img) {
      const trucksDocs = await this.filesService.createFile(
        FileType.TRUCK_DOC,
        docs_img[0],
      );
      return await this.trucksService.updateTruck({
        ...payload,
        docs_img: trucksDocs,
      });
    } else {
      return await this.trucksService.updateTruck(payload);
    }
  }
}
