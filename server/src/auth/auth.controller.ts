import { AuthGuard } from '@nestjs/passport';
import { RefreshAuthGuard } from './../guards/refresh.guard';
import { User } from 'src/auth/user.entity';
import { AccessTokenType } from './../types/token.types';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Response as ResponseType } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Body() authSignUpDto: AuthSignUpDto,
    @Res({ passthrough: true }) res: ResponseType,
  ): Promise<AccessTokenType> {
    const tokens = await this.authService.signUp(authSignUpDto);
    res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true });
    return { access_token: tokens.access_token };
  }

  @Post('/signin')
  async signIn(
    @Body() authSignInDto: AuthSignInDto,
    @Res({ passthrough: true }) res: ResponseType,
  ): Promise<AccessTokenType> {
    const tokens = await this.authService.signIn(authSignInDto);
    res.cookie('refresh_token', tokens.refresh_token, { httpOnly: true });
    return { access_token: tokens.access_token };
  }

  @UseGuards(AuthGuard())
  @Post('/logout')
  async logout(
    @GetUser() user: User,
    @Res({ passthrough: true }) res: ResponseType,
  ): Promise<boolean> {
    res.clearCookie('refresh_token');
    return await this.authService.logout(user.id);
  }

  @UseGuards(RefreshAuthGuard)
  @Post('/refresh')
  async refreshToken(
    @GetUser() user,
    @Res({ passthrough: true }) res: ResponseType,
  ): Promise<AccessTokenType> {
    const { id, refreshToken } = user;
    const tokens = await this.authService.refreshToken(id, refreshToken);
    res.cookie('refresh_token', refreshToken, { httpOnly: true });
    return { access_token: tokens.access_token };
  }
}
