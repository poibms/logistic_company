import { Test } from '@nestjs/testing';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { AuthSignUpDto } from '../dto/auth-signup.dto';

const mockUserRepository = () => ({
  signUp: jest.fn(),
  logout: jest.fn(),
  getUserByEmail: jest.fn(),
});

const mockUser: User = {
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

describe('TaskRepository', () => {
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [{ provide: UserRepository, useFactory: mockUserRepository }],
    }).compile();
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('createUser', () => {
    let authSignUpDto: AuthSignUpDto;
    let user: User;

    beforeEach(async () => {
      authSignUpDto = {
        name: 'jest',
        surname: 'jested',
        phone: '+375000000000',
        email: 'jest@gmail.com',
        password: '12345678',
      };
      user = await userRepository.signUp(user);
    });

    it('creates a task', async () => {
      const signUp = jest.fn();
      userRepository.signUp = jest.fn().mockImplementation(() => ({ signUp }));

      await userRepository.signUp(authSignUpDto);
      expect(userRepository.signUp).toHaveBeenCalled();
    });
  });

  describe('get users', () => {
    describe('user by email', () => {
      let user: User;

      beforeEach(async () => {
        // jest.spyOn(userRepository, 'getUserByEmail');
        user = await userRepository.getUserByEmail('admin@gmail.com');
      });

      test('then it should call the userModel', () => {
        expect(userRepository.getUserByEmail).toHaveBeenCalledWith(
          'admin@gmail.com',
        );
      });

      test('then it should return a user', () => {
        expect(user).toEqual(mockUser);
      });
    });
  });
});
