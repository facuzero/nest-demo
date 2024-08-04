import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../users/users.entity';
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(loginDto: LoginUserDto) {
    const { email, password } = loginDto;
    if (!email || !password) {
      throw new BadRequestException('Email y contraseña requeridos');
    }
    const userExists = await this.userRepository.getByEmail(email);
    const isValidPassword = await bcrypt.compare(password, userExists.password);
    if (!userExists || !isValidPassword) {
      throw new BadRequestException('Credenciales incorrectas');
    }
    const payload = {
      id: userExists.id,
      email: userExists.email,
      isAdmin: userExists.isAdmin,
    };
    const token = this.jwtService.sign(payload);
    return { message: 'Usuario logueado', token };
  }

  async signup(user: Partial<User>) {
    const { password } = user;
    const hashPass = await bcrypt.hash(password, 10);
    return await this.userRepository.createUser({
      ...user,
      password: hashPass,
    });
  }

  async toAdmin(id: string) {
    await this.userRepository.editUser(id, {
      isAdmin: true,
    });
    return { message: 'EL usuario ahora es administrador' };
  }
}
