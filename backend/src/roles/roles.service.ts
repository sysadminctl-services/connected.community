import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  create(createRoleDto: CreateRoleDto) {
    return this.prisma.role.create({ data: createRoleDto });
  }

  findAll() {
    return this.prisma.role.findMany();
  }

  async findOne(id: number) {
    const role = await this.prisma.role.findUnique({ where: { id } });
    if (!role) {
      throw new NotFoundException(`Role with ID #${id} not found.`);
    }
    return role;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    this.findOne(id);
    return this.prisma.role.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  remove(id: number) {
    this.findOne(id);
    return this.prisma.role.delete({ where: { id } });
  }
}