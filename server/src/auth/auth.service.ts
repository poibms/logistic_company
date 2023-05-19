import { Drivers } from 'src/drivers/drivers.entity';
import { DriversRepository } from './../drivers/drivers.repository';
import { UserRepository } from '../users/users.repository';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { serialize } from 'cookie';
import { Response as ResponseType } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokensType } from 'src/types/token.types';
import { User } from 'src/users/users.entity';
import { JwtPayload } from '../types/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private driversRepository: DriversRepository,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(authSignUpDto: AuthSignUpDto): Promise<TokensType> {
    const { password } = authSignUpDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await this.userRepository.signUp({
      ...authSignUpDto,
      password: hashedPassword,
    });
    const tokens = await this.genAccesToken(user);
    await this.userRepository.updateUserRefreshToken(
      user.id,
      tokens.refresh_token,
    );
    return tokens;
  }

  async signIn(authSignInDto: AuthSignInDto): Promise<TokensType> {
    const { email, password } = authSignInDto;

    const user = await this.userRepository.getUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const tokens = await this.genAccesToken(user);
      await this.userRepository.updateUserRefreshToken(
        user.id,
        tokens.refresh_token,
      );

      return tokens;
    } else {
      throw new UnauthorizedException('Please check your credentials');
    }
  }

  async signInDriver(authSignInDto: AuthSignInDto): Promise<TokensType> {
    const { email, password } = authSignInDto;

    const user = await this.driversRepository.getDriverByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const tokens = await this.genAccesToken(user);
      await this.driversRepository.updateDriverRefreshToken(
        user.id,
        tokens.refresh_token,
      );

      return tokens;
    } else {
      throw new UnauthorizedException('Please check your credentials');
    }
  }

  async logout(user: User | Drivers): Promise<boolean> {
    if (user.role === 'user') {
      return await this.userRepository.logout(user.id);
    } else {
      return await this.driversRepository.logout(user.id);
    }
  }

  async refreshToken(
    userId: string,
    refreshToken: string,
    role: string,
  ): Promise<TokensType> {
    if (role === 'driver') {
      const driver = await this.driversRepository.getDriverById(userId);
      if (!driver || !driver.rthash)
        throw new BadRequestException('Access denied');

      const isRefreshMatch = await bcrypt.compare(refreshToken, driver.rthash);
      if (!isRefreshMatch) throw new ForbiddenException('Access Denied');

      const tokens = await this.genAccesToken(driver);
      await this.userRepository.updateUserRefreshToken(
        driver.id,
        tokens.refresh_token,
      );
      return tokens;
    }
    const user = await this.userRepository.getUserById(userId);
    if (!user || !user.rthash) throw new BadRequestException('Access denied');

    const isRefreshMatch = await bcrypt.compare(refreshToken, user.rthash);
    if (!isRefreshMatch) throw new ForbiddenException('Access Denied');

    const tokens = await this.genAccesToken(user);
    await this.driversRepository.updateDriverRefreshToken(
      user.id,
      tokens.refresh_token,
    );

    return tokens;
  }

  async genAccesToken(user: User | Drivers): Promise<TokensType> {
    const jwtPayload: JwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const [accesToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: accesToken,
      refresh_token: refreshToken,
    };
  }

  clearRefreshToken(res: ResponseType) {
    const cookie = serialize('refresh_token', '', {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
      expires: new Date(0),
    });
    res.setHeader('Set-Cookie', cookie);
  }
}
