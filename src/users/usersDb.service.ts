import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './users.entity';
import { LoginUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UsersDbService {
  constructor(private readonly userRepository: UsersRepository) {}

  async getUsers(page: number, limit: number): Promise<Partial<User>[]> {
    return this.userRepository.getUsers(page, limit);
  }
  async getById(id: string): Promise<Omit<User, 'password'>> {
    const user = this.userRepository.getById(id);
    return user;
  }
  async getByEmail(
    email: Omit<LoginUserDto, 'password'>,
  ): Promise<Partial<User>> {
    const user = this.userRepository.getByEmail(email.email);
    return user;
  }
  async createUser(newUser: Partial<User>): Promise<string> {
    return this.userRepository.createUser(newUser);
  }
  async editUser(userId: string, fields: UpdateUserDto) {
    return this.userRepository.editUser(userId, fields);
  }
  async deleteUser(userId: string): Promise<string> {
    return this.userRepository.deleteUser(userId);
  }
  async signin(email: string, password: string) {
    return this.userRepository.signin(email, password);
  }
}
