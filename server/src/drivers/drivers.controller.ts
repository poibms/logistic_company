import { setTruckType } from './../types/drivers.types';
import { UserRole } from './../types/user.types';
import { AuthGuard } from '@nestjs/passport';
import { Drivers } from 'src/drivers/drivers.entity';
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
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/drivers-create.dto';
import RoleGuard from 'src/guards/get-role.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FilesService } from 'src/files/files.service';
import { FileType } from 'src/types/files.types';

@Controller('drivers')
@UseGuards(AuthGuard())
export class DriversController {
  constructor(
    private driversService: DriversService,
    private filesService: FilesService,
  ) {}

  @Post('/')
  @UseGuards(RoleGuard(UserRole.ADMIN))
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }]))
  async createDriver(
    @Body() createDriverDto: CreateDriverDto,
    @UploadedFiles() files,
  ): Promise<Drivers> {
    const { photo } = files;
    return await this.driversService.createDriver(createDriverDto, photo[0]);
  }

  @Get('/')
  @UseGuards(RoleGuard(UserRole.ADMIN))
  async getAllDrivers(): Promise<Drivers[]> {
    return await this.driversService.getAllDrivers();
  }

  @Get('/byid/:id')
  @UseGuards(RoleGuard(UserRole.DRIVER))
  async getDriverById(@Param('id') id): Promise<Drivers> {
    return await this.driversService.getDriverById(id);
  }

  @Delete('/:id')
  async deleteDriverById(@Param('id') id): Promise<{ message: string }> {
    return await this.driversService.deleteDriverById(id);
  }

  @Put('/')
  @UseGuards(RoleGuard(UserRole.ADMIN))
  async setDriverToTruck(@Body() payload: setTruckType) {
    return await this.driversService.setDriverToTruck(payload);
  }

  @Put('/unset')
  @UseGuards(RoleGuard(UserRole.ADMIN))
  async unSetDriverToTruck(@Body() payload: setTruckType) {
    return await this.driversService.unSetDriverToTruck(payload);
  }

  @Put('/driver')
  @UseGuards(RoleGuard(UserRole.ADMIN))
  @UseInterceptors(FileFieldsInterceptor([{ name: 'photo', maxCount: 1 }]))
  async updateDriver(
    @Body() payload: any,
    @UploadedFiles() files,
  ): Promise<Drivers> {
    console.log(payload);
    console.log(files);
    const { photo } = files;
    if (photo) {
      const driverPhoto = await this.filesService.createFile(
        FileType.DRIVERS,
        photo[0],
      );
      return await this.driversService.updateDriver({
        ...payload,
        photo: driverPhoto,
      });
    } else {
      return await this.driversService.updateDriver(payload);
    }
  }
}
