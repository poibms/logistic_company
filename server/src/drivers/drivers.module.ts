import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { Drivers } from './drivers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Drivers])],
  providers: [DriversService],
  controllers: [DriversController],
})
export class DriversModule {}
