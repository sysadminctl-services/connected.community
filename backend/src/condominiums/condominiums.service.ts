import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCondominiumDto } from './dto/create-condominium.dto';
import { UpdateCondominiumDto } from './dto/update-condominium.dto';
import { User } from '@prisma/client';

@Injectable()
export class CondominiumsService {
  constructor(private prisma: PrismaService) {}

  create(createCondominiumDto: CreateCondominiumDto) {
    return this.prisma.condominium.create({
      data: createCondominiumDto,
    });
  }

  findAll() {
    return this.prisma.condominium.findMany();
  }

  async findOne(id: number) {
    const condominium = await this.prisma.condominium.findUnique({
      where: { id },
    });

    if (!condominium) {
      throw new NotFoundException(`Condominium with ID #${id} not found`);
    }

    return condominium;
  }

  async update(id: number, updateCondominiumDto: UpdateCondominiumDto, user: User) {
    // Primero, verificamos que el condominio exista
    const condominium = await this.findOne(id); // Reutilizamos nuestro método findOne

    // ¡¡¡AQUÍ ESTÁ LA VERIFICACIÓN DE SEGURIDAD!!!
    // Comprobamos si el ID del administrador del condominio es el mismo que el ID del usuario que hace la petición.
    if (condominium.administratorId !== user.id) {
      throw new ForbiddenException(
        'You do not have permission to edit this condominium.',
      );
    }

    // Si la verificación pasa, procedemos a actualizar
    return this.prisma.condominium.update({
      where: { id },
      data: updateCondominiumDto,
    });
  }

  async remove(id: number, user: User) {
    const condominium = await this.findOne(id);

    if (condominium.administratorId !== user.id) {
      throw new ForbiddenException(
        'You do not have permission to delete this condominium.',
      );
    }

    return this.prisma.condominium.delete({
      where: { id },
    });
  }
}
