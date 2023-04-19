import { MailModule } from './../mail/mail.module';
import { FilesModule } from './../files/files.module';
import { DriversRepository } from './drivers.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef, Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { Drivers } from './drivers.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TrucksModule } from 'src/trucks/trucks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Drivers]),
    forwardRef(() => AuthModule),
    FilesModule,
    TrucksModule,
    MailModule,
  ],
  providers: [DriversService, DriversRepository],
  controllers: [DriversController],
  exports: [DriversService, DriversRepository],
})
export class DriversModule {}
