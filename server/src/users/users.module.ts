import { UserRepository } from './users.repository';
import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { User } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
