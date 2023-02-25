import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from './../files/files.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Trucks } from './trucks.entity';
import { TrucksService } from './trucks.service';
import { TrucksController } from './trucks.controller';
import { TrucksRepository } from './trucks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Trucks]), FilesModule, AuthModule],
  providers: [TrucksService, TrucksRepository],
  controllers: [TrucksController],
})
export class TracksModule {}
