import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUsers(
    page: number = 1,
    limit: number = 5,
  ): Promise<Omit<User, 'password'>[]> {
    const startIndex = (Number(page) - 1) * Number(limit);
    const users = await this.userRepository.find({
      skip: startIndex,
      take: limit,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, ...otherData }) => otherData);
  }
  async getById(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { orders_id: true },
    });
    if (!user) {
      throw new NotFoundException(`No se encontró el usuario con el id ${id}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...data } = user;
    return data;
    return null;
  }
  async getByEmail(email: string): Promise<Partial<User>> {
    const userByEmail = await this.userRepository.findOne({ where: { email } });
    if (!userByEmail)
      throw new NotFoundException(
        `No se encontró el usuario con el email ${email}`,
      );
    return userByEmail;
  }
  async createUser(user: Partial<User>): Promise<string> {
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return newUser.id;
  }

  async editUser(userId: string, fields: User): Promise<string> {
    await this.userRepository.update(userId, fields);
    const userUpdated = await this.getById(userId);
    return userUpdated.id;
  }

  async deleteUser(userId: string): Promise<string> {
    await this.userRepository.delete(userId);
    return userId;
  }

  async signin(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email, password });
    if (user && user.password === password) {
      return 'Signin correcto ' + user;
    } else {
      throw new BadRequestException(`Email o contraseña incorrectos`);
    }
  }
}
