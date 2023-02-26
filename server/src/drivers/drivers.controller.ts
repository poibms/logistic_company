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

@Controller('drivers')
@UseGuards(AuthGuard())
export class DriversController {
  constructor(private driversService: DriversService) {}

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

  @Delete('/:id')
  async deleteDriverById(@Param('id') id): Promise<{ message: string }> {
    return await this.driversService.deleteDriverById(id);
  }

  @Put('/')
  @UseGuards(RoleGuard(UserRole.ADMIN))
  async setTruckToDriver(@Body() payload: setTruckType) {
    return await this.driversService.setTruckToDriver(payload);
  }

  // @Put('')
}
