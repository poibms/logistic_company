import { AccessTokenType } from './../../types/token.types';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { AuthSignUpDto } from '../dto/auth-signup.dto';
import { Response as ResponseType } from 'express';

jest.mock('../auth.service');

describe('UsersController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be ok', () => {
    expect(controller).toBeDefined();
  });

  // describe('signUp user', () => {
  //   let token: AccessTokenType;
  //   let authSignUpDto: AuthSignUpDto;
  //   let res: ResponseType;

  //   beforeEach(async () => {
  //     authSignUpDto = {
  //       name: 'admin',
  //       surname: 'adminushka',
  //       phone: '+375000000000',
  //       email: 'admin@gmail.com',
  //       password: '12345678',
  //     };

  //     token = await controller.signUp(authSignUpDto, res);
  //   });

  //   test('then it should call authService', () => {
  //     expect(authService.signUp).toHaveBeenCalledWith(authSignUpDto);
  //     res.cookie('refresh_token', 'sdfgdsgsdgwewr', { httpOnly: true });
  //   });

  //   // test('then is should return a user', () => {
  //   //   expect(token).toEqual({ access_token: 'fwwetrwt' });
  //   // })
  // });
});
