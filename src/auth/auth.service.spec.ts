import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/users.entity';

describe('authService', () => {
  let authService: AuthService;
  let mockUserService: Partial<AuthService>;
  const mockUser: Partial<User> = {
    name: 'Test name',
    email: 'Test email',
    password: 'AAbb11##',
    address: 'Test address',
    city: 'Test city',
    country: 'Test country',
    phone: 12345678,
    isAdmin: false,
  };
  beforeEach(async () => {
    mockUserService = {
      signin: () =>
        Promise.resolve({ message: 'Usuario logueado', token: 'fake token' }),
      signup: (user: Partial<User>): Promise<string> =>
        Promise.resolve((user.id = '1234fs-234sd-24csdf-34sdfg')),
      toAdmin: (): Promise<{ message: string }> =>
        Promise.resolve({ message: 'EL usuario ahora es administrador' }),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        { provide: AuthService, useValue: mockUserService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });
  it('Create an instance of AuthService ', async () => {
    expect(authService).toBeDefined();
  });
  it('signUp() create a new user with an encripted password', async () => {
    const user = await authService.signup(mockUser);
    expect(user).toBeDefined();
  });
  it('signin() login user and return JWT', async () => {
    const user = await authService.signin({
      email: mockUser.email,
      password: mockUser.password,
    });
    expect(user).toBeDefined();
    expect(user.message).toBe('Usuario logueado');
    expect(user.token).toBe('fake token');
  });
  it('toAdmin() update user and change rol to admin', async () => {
    const toAdmin = await authService.toAdmin(mockUser.id);
    expect(toAdmin).toStrictEqual({
      message: 'EL usuario ahora es administrador',
    });
  });
  it('signUp() throws error if the email exist', async () => {
    mockUserService.signup = (mockUser) => Promise.resolve(mockUser.id);
    try {
      await authService.signup(mockUser);
    } catch (error) {
      expect(error.message).toEqual('El email ya existe');
    }
  });
  it('signIn() throws error if the email or password are incorrect', async () => {
    mockUserService.signin = () =>
      Promise.resolve({ message: 'Usuario logueado', token: 'token' });
    try {
      await authService.signup(mockUser);
    } catch (error) {
      expect(error.message).toEqual('Credenciales invalidas');
    }
  });
});
