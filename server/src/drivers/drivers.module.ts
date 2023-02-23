import { DriversRepository } from './drivers.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { Drivers } from './drivers.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Drivers]), AuthModule],
  providers: [DriversService, DriversRepository],
  controllers: [DriversController],
})
export class DriversModule {}
