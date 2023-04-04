import { DriversModule } from './../drivers/drivers.module';
import { Orders } from 'src/orders/orders.entity';
import { OrdersRepository } from './orders.repository';
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders]),
    AuthModule,
    FilesModule,
    DriversModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
