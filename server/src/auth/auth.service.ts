import { AuthCredsDto } from './dto/auth-creds.dto';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authSignUpDto: AuthSignUpDto): Promise<AuthCredsDto> {
    const user = await this.userRepository.signUp(authSignUpDto);
    const token = await this.genAccesToken(user);
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        surname: user.surname,
        role: user.role,
      },
      accessToken: token,
    };
  }

  async signIn(authSignInDto: AuthSignInDto): Promise<AuthCredsDto> {
    const { email, password } = authSignInDto;

    const user = await this.userRepository.getUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await this.genAccesToken(user);
      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          surname: user.surname,
          role: user.role,
        },
        accessToken: token,
      };
    } else {
      throw new UnauthorizedException('Please check your credentials');
    }
  }

  private async genAccesToken(user: User): Promise<string> {
    const payload: JwtPayload = { id: user.id, email: user.email };
    const accessToken: string = await this.jwtService.sign(payload);
    return accessToken;
  }
}
