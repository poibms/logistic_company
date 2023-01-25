import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() authSignUpDto: AuthSignUpDto): Promise<void> {
    return this.authService.signUp(authSignUpDto);
  }

  @Post('/signin')
  async signIn(@Body() authSignInDto: AuthSignInDto): Promise<string> {
    return await this.authService.signIn(authSignInDto);
  }
}
