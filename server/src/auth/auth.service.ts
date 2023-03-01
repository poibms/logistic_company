import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';
import { TokensType } from 'src/types/token.types';
import { JwtPayload } from 'dist/auth/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
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

  async logout(userId: string): Promise<boolean> {
    return await this.userRepository.logout(userId);
  }

  async refreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<TokensType> {
    const user = await this.userRepository.getUserById(userId);
    if (!user || !user.rthash) throw new BadRequestException('Access denied');

    const isRefreshMatch = await bcrypt.compare(refreshToken, user.rthash);
    if (!isRefreshMatch) throw new ForbiddenException('Access Denied');

    const tokens = await this.genAccesToken(user);
    await this.userRepository.updateUserRefreshToken(
      user.id,
      tokens.refresh_token,
    );

    return tokens;
  }

  private async genAccesToken(user: User): Promise<TokensType> {
    const jwtPayload: JwtPayload = {
      id: user.id,
      email: user.email,
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
}
