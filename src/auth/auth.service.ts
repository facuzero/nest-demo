import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signin(email: string, password: string) {
    const userExists = await this.userRepository.getByEmail(email);
    const isValidPassword = await bcrypt.compare(password, userExists.password);
    if (!userExists || !isValidPassword) {
      throw new BadRequestException('Credenciales incorrectas');
    }
    const payload = { id: userExists.id, email: userExists.email };
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
}
