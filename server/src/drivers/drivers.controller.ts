import { UserRole } from './../types/user.types';
import { AuthGuard } from '@nestjs/passport';
import { Drivers } from 'src/drivers/drivers.entity';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { CreateDriverDto } from './dto/drivers-create.dto';
import RoleGuard from 'src/guards/get-role.guard';

@Controller('drivers')
@UseGuards(AuthGuard())
@UseGuards(RoleGuard(UserRole.ADMIN))
export class DriversController {
  constructor(private driversService: DriversService) {}

  @Post('/')
  async createDriver(
    @Body() createDriverDto: CreateDriverDto,
  ): Promise<Drivers> {
    return await this.driversService.createDriver(createDriverDto);
  }
}
