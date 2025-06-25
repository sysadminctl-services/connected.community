import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { User } from '@prisma/client';

@Injectable()
export class PropertiesService {
  constructor(private prisma: PrismaService) {}

  async create(createPropertyDto: CreatePropertyDto, user: User) {
    const { condominiumId } = createPropertyDto;

    const condominium = await this.prisma.condominium.findUnique({
      where: { id: condominiumId },
    });
    if (!condominium) {
      throw new NotFoundException(`Condominium with ID #${condominiumId} not found`);
    }

    if (condominium.administratorId !== user.id) {
      throw new ForbiddenException('You are not the administrator of this condominium.');
    }

    return this.prisma.property.create({
      data: createPropertyDto,
    });
  }

  findAll(condominiumId?: number) {
    return this.prisma.property.findMany({
      where: {
        condominiumId: condominiumId,
      },
    });
  }

  async findOne(id: number) {
    const property = await this.prisma.property.findUnique({
      where: { id },
    });

    if (!property) {
      throw new NotFoundException(`Property with ID #${id} not found.`);
    }
    return property;
  }

  async update(id: number, updatePropertyDto: UpdatePropertyDto, user: User) {
    const property = await this.findOne(id); // Reutilizamos para verificar que la propiedad exista

    // Verificamos que el usuario sea el administrador del condominio al que pertenece la propiedad
    if (property.condominiumId) {
      const condominium = await this.prisma.condominium.findUnique({
        where: { id: property.condominiumId },
      });

      if (!condominium) {
        throw new NotFoundException(
          `The condominium with ID #${property.condominiumId} associated with this property was not found.`,
        );
      }

      if (condominium.administratorId !== user.id) {
        throw new ForbiddenException(
          'You do not have permission to edit properties in this condominium.',
        );
      }
    }

    return this.prisma.property.update({
      where: { id },
      data: updatePropertyDto,
    });
  }

  async remove(id: number, user: User) {
    const property = await this.findOne(id);

    if (property.condominiumId) {
      const condominium = await this.prisma.condominium.findUnique({
        where: { id: property.condominiumId },
      });

      if (!condominium) {
        throw new NotFoundException(
          `The condominium with ID #${property.condominiumId} associated with this property was not found.`,
        );
      }

      if (condominium.administratorId !== user.id) {
        throw new ForbiddenException(
          'You do not have permission to delete properties in this condominium.',
        );
      }
    }

    return this.prisma.property.delete({
      where: { id },
    });
  }
}