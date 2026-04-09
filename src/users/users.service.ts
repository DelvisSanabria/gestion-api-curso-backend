/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany();
    if (users === null || users === undefined || users.length === 0) {
      throw new NotFoundException('No se encontraron usuarios');
    }
    return users;
  }
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('El usuario ya existe');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newUser = { ...createUserDto };
    return this.prisma.user.create({ data: newUser });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (user === null || user === undefined) {
      throw new NotFoundException('No se encontró el usuario');
    }
    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email: email },
    });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id: id },
    });
  }
}
