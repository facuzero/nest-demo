import { Test, TestingModule } from '@nestjs/testing';
import { UsersDbService } from './usersDb.service';
import { User } from './users.entity';

describe('UsersService', () => {
  let userService: UsersDbService;
  let mockUserService: Partial<UsersDbService>;
  const mockArrayUser: Partial<User>[] = [
    {
      name: 'Test name',
      email: 'Test email',
      password: 'AAbb11##',
      address: 'Test address',
      city: 'Test city',
      country: 'Test country',
      phone: 12345678,
      isAdmin: false,
    },
    {
      name: 'Test name2',
      email: 'Test email2',
      password: 'AAbb11##',
      address: 'Test address2',
      city: 'Test city2',
      country: 'Test country2',
      phone: 12345678,
      isAdmin: false,
    },
  ];
  const mockUser2: Omit<User, 'password'> = {
    id: '',
    name: 'Test name',
    email: 'Test email',
    address: 'Test address',
    city: 'Test city',
    country: 'Test country',
    phone: 12345678,
    isAdmin: true,
    orders: [],
  };
  beforeEach(async () => {
    mockUserService = {
      deleteUser: () => Promise.resolve('Usuario eliminado'),
      editUser: () => Promise.resolve(mockUser2),
      getByEmail: () => Promise.resolve(mockUser2),
      getById: () => Promise.resolve(mockUser2),
      getUsers: () => Promise.resolve(mockArrayUser),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersDbService,
        {
          provide: UsersDbService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userService = module.get<UsersDbService>(UsersDbService);
  });

  it('Create an instance of userService', async () => {
    expect(userService).toBeDefined();
  });

  it('getUsers() Get all user if user logued is admin', async () => {
    const users = await userService.getUsers(1, 5);
    expect(users).toEqual(mockArrayUser);
  });

  it('getById() Get user by ID', async () => {
    const users = await userService.getById(mockUser2.id);
    expect(users).toEqual(mockUser2);
  });

  it('getByEmail() Get user by email', async () => {
    const users = await userService.getByEmail({ email: mockUser2.email });
    expect(users).toEqual(mockUser2);
  });

  it('editUser() Edit user ', async () => {
    const users = await userService.editUser(mockUser2.id, mockUser2);
    expect(users).toEqual(mockUser2);
  });
});
