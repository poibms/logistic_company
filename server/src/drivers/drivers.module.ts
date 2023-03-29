import { FilesModule } from './../files/files.module';
import { DriversRepository } from './drivers.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { Drivers } from './drivers.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TrucksModule } from 'src/trucks/trucks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Drivers]),
    AuthModule,
    FilesModule,
    TrucksModule,
  ],
  providers: [DriversService, DriversRepository],
  controllers: [DriversController],
  exports: [DriversService],
})
export class DriversModule {}
