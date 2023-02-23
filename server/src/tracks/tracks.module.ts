import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { Trucks } from './trucks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trucks])],
})
export class TracksModule {}
