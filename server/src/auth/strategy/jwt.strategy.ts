import { Drivers } from 'src/drivers/drivers.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/users/users.repository';
import { User } from 'src/users/users.entity';
import { DriversRepository } from 'src/drivers/drivers.repository';
import { JwtPayload } from 'src/types/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userRepository: UserRepository,
    config: ConfigService,
    private driverRepository: DriversRepository,
  ) {
    super({
      secretOrKey: config.get<string>('JWT_ACCESS_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User | Drivers> {
    const { email, role } = payload;
    if (role === 'driver') {
      const driver = await this.driverRepository.getDriverByEmail(email);

      if (!driver) {
        throw new UnauthorizedException();
      }
      return driver;
    }
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
