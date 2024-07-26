import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

function isValidUUID(uuid: string): boolean {
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(uuid);
}
@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUsers(
    page: number = 1,
    limit: number = 5,
  ): Promise<Partial<User>[]> {
    const startIndex = (Number(page) - 1) * Number(limit);
    const users = await this.userRepository.find({
      skip: startIndex,
      take: limit,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return users.map(({ password, isAdmin, ...otherData }) => otherData);
  }
  async getById(id: string): Promise<Omit<User, 'password'>> {
    if (!isValidUUID(id)) {
      throw new BadRequestException('El ID proporcionado no es de tipo UUID');
    }
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { orders: true },
    });
    if (!user) {
      throw new NotFoundException(`No se encontró el usuario con el id ${id}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...data } = user;
    return data;
  }
  async getByEmail(email: string): Promise<Partial<User>> {
    if (!email) {
      throw new BadRequestException('Email es requerido');
    }
    const userByEmail = await this.userRepository.findOne({
      where: { email },
    });
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

  async editUser(userId: string, fields: Partial<UpdateUserDto>) {
    const user = await this.getById(userId);
    if (!user) {
      throw new NotFoundException(
        `No se encontró el usuario con el id ${userId}`,
      );
    }
    //Hasheo denuevo el password
    fields.password = await bcrypt.hash(fields.password, 10);
    // Filtrar los campos que se pueden actualizar
    const updateFields = { ...fields };
    delete updateFields.confirmPassword;

    await this.userRepository.update(userId, updateFields);
    const userUpdated = await this.getById(userId);
    return userUpdated;
  }

  async deleteUser(userId: string): Promise<string> {
    await this.userRepository.delete(userId);
    return 'Usuario eliminado';
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
