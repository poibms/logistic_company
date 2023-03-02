import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { User } from '../user.entity';

describe('UsersController', () => {
  let controller: AuthController;

  const mockUsersService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be ok', () => {
    expect(controller).toBeDefined();
  });
});
