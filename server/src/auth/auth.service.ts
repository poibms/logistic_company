import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  signUp(authSignUpDto: AuthSignUpDto): Promise<void> {
    return this.userRepository.signUp(authSignUpDto);
  }

  async signIn(authSignInDto: AuthSignInDto): Promise<string> {
    const { email, password } = authSignInDto;

    const user = await this.userRepository.getUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // const payload: JwtPayload = { username };
      // const accessToken: string = await this.jwtService.sign(payload);
      // return { accessToken };
      return user.email;
    } else {
      throw new UnauthorizedException('Please check your credentials');
    }
  }
}
