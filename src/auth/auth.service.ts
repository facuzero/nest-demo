import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UsersRepository) {}
  async signin(email: string, password: string) {
    return this.userRepository.signin(email, password);
  }
}
