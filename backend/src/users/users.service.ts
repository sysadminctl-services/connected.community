import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Función de ayuda para excluir campos de un objeto
  private exclude<User extends Record<string, any>, Key extends keyof User>(
    user: User,
    keys: Key[],
  ): Omit<User, Key> {
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !keys.includes(key as Key)),
    ) as Omit<User, Key>;
  }

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    return this.exclude(user, ['password']);
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: { role: true }, // Incluimos el rol para dar más contexto
    });
    return users.map((user) => this.exclude(user, ['password']));
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });
    if (!user) {
      throw new NotFoundException(`User with ID #${id} not found.`);
    }
    return this.exclude(user, ['password']);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // Si se incluye una nueva contraseña, la hasheamos
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return this.exclude(user, ['password']);
  }

  async remove(id: number) {
    await this.findOne(id); // Para verificar que existe
    const user = await this.prisma.user.delete({ where: { id } });
    return this.exclude(user, ['password']);
  }
}