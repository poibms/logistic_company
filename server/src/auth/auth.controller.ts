import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() authSignUpDto: AuthSignUpDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signUp(authSignUpDto);
  }

  @Post('/signin')
  async signIn(
    @Body() authSignInDto: AuthSignInDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authSignInDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
