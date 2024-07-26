import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersDbService } from 'src/users/usersDb.service';
import { User } from 'src/users/users.entity';

it('Create an instance of AuthService ', async () => {
  const mockUserService: Partial<UsersDbService> = {
    getByEmail: () => Promise.resolve(undefined),
    createUser: (user: Partial<User>): Promise<string> =>
      Promise.resolve((user.id = '1234fs-234sd-24csdf-34sdfg')),
  };
  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      JwtService,
      { provide: UsersDbService, useValue: mockUserService },
    ],
  }).compile();

  const authService = module.get<AuthService>(AuthService);
  expect(authService).toBeDefined();
});
