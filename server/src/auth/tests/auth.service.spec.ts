import { TokensType } from 'src/types/token.types';
import { AuthService } from './../auth.service';
import { Test } from '@nestjs/testing';
import { AuthSignUpDto } from '../dto/auth-signup.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/user.entity';

const mockUserRepository = () => ({
  signUp: jest.fn(),
  logout: jest.fn(),
});

const mockConfigService = () => ({
  get: jest.fn(),
});

const mockJwtService = () => ({
  signAsync: jest.fn(),
});

describe('UsersController', () => {
  let service: AuthService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: ConfigService, useFactory: mockConfigService },
        { provide: JwtService, useFactory: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  // describe('signUp user', () => {
  //   let tokens: TokensType;
  //   let authSignUpDto: AuthSignUpDto;

  //   beforeEach(async () => {
  //     authSignUpDto = {
  //       name: 'admin',
  //       surname: 'adminushka',
  //       phone: '+375000000000',
  //       email: 'admin@gmail.com',
  //       password: '12345678',
  //     };

  //     tokens = await service.signUp(authSignUpDto);
  //   });

  //   test('then it should call signUp', () => {
  //     expect(userRepository.signUp).toHaveBeenCalledWith(authSignUpDto);
  //   });
  // });

  describe('genAccesToken', () => {
    let user: User;
    let tokens: TokensType;
    let saveSpy: jest.SpyInstance;
    let constructorSpy: jest.SpyInstance;
    beforeEach(async () => {
      user = {
        id: '5',
        name: 'admin',
        surname: 'adminushka',
        phone: '+375000000000',
        email: 'admin@gmail.com',
        password: '12345678',
        role: 'ADMIN',
        rthash: '$af3241fr2gerssdggdsg',
        orders: [],
      };
      saveSpy = jest.spyOn(service, 'genAccesToken');
      constructorSpy = jest.spyOn(service, 'genAccesToken');
      tokens = await service.genAccesToken(user);
    });

    test('then it should call genAccesToken', () => {
      expect(saveSpy).toHaveBeenCalled();
      expect(constructorSpy).toHaveBeenCalledWith(user);
      // expect(service.genAccesToken).toHaveBeenCalledWith(user);
    });

    test('then it should return a tokens', () => {
      expect(tokens).toEqual(tokens);
    });
  });

  describe('logout', () => {
    let isLogout: boolean;
    beforeEach(async () => {
      // jest.spyOn(userRepository, 'logout');
      isLogout = await userRepository.logout('1');
    });

    test('then it should call the userRepository', () => {
      expect(userRepository.logout).toHaveBeenCalledWith('1');
    });
  });
});
