import { Drivers } from 'src/drivers/drivers.entity';
import { AuthGuard } from '@nestjs/passport';
import { RefreshAuthGuard } from './../guards/refresh.guard';
import { AccessTokenType } from './../types/token.types';
import { AuthSignInDto } from './dto/auth-signin.dto';
import { AuthSignUpDto } from './dto/auth-signup.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user.decorator';
import { Response as ResponseType } from 'express';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/users/users.entity';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up User' })
  @ApiResponse({ status: 201, type: AccessTokenType })
  @Post('/signup')
  async signUp(
    @Body() authSignUpDto: AuthSignUpDto,
    @Res({ passthrough: true }) res: ResponseType,
  ): Promise<AccessTokenType> {
    const tokens = await this.authService.signUp(authSignUpDto);
    res.cookie('refresh_token', tokens.refresh_token);
    return { access_token: tokens.access_token };
  }

  @ApiOperation({ summary: 'Sign in user' })
  @ApiResponse({ status: 201, type: AccessTokenType })
  @Post('/signin')
  async signIn(
    @Body() authSignInDto: AuthSignInDto,
    @Res({ passthrough: true }) res: ResponseType,
  ): Promise<AccessTokenType> {
    const tokens = await this.authService.signIn(authSignInDto);
    res.cookie('refresh_token', tokens.refresh_token);
    return { access_token: tokens.access_token };
  }

  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 201 })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard())
  @Post('/logout')
  async logout(
    @GetUser() user: User | Drivers,
    @Res({ passthrough: true }) res: ResponseType,
  ): Promise<boolean> {
    res.clearCookie('refresh_token');
    return await this.authService.logout(user);
  }

  @ApiOperation({ summary: 'Refresh user token' })
  @ApiResponse({ status: 201 })
  @ApiCookieAuth()
  @UseGuards(RefreshAuthGuard)
  @Post('/refresh')
  async refreshToken(
    @GetUser() user,
    @Res({ passthrough: true }) res: ResponseType,
  ): Promise<AccessTokenType> {
    console.log('refresh');
    const { refreshToken } = user;
    const tokens = await this.authService.refreshToken(refreshToken);
    res.cookie('refresh_token', refreshToken);
    return { access_token: tokens.access_token };
  }

  @Post('/signindriver')
  async signInDriver(
    @Body() authSignInDto: AuthSignInDto,
    @Res({ passthrough: true }) res: ResponseType,
  ): Promise<AccessTokenType> {
    const tokens = await this.authService.signInDriver(authSignInDto);
    res.cookie('refresh_token', tokens.refresh_token);
    console.log(tokens);
    return { access_token: tokens.access_token };
  }
}
