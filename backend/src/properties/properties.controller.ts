import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '@prisma/client';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('properties')
@UseGuards(AuthGuard('jwt')) // Todas las rutas de este controlador requieren autenticación
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMINISTRATOR')
  create(@Body() createPropertyDto: CreatePropertyDto, @GetUser() user: User) {
    return this.propertiesService.create(createPropertyDto, user);
  }

  @Get()
  findAll(@Query('condominiumId') condominiumId?: string) {
    // El '+' convierte el string a número. Si es undefined, pasa undefined.
    const condoId = condominiumId ? +condominiumId : undefined;
    return this.propertiesService.findAll(condoId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.propertiesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMINISTRATOR')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePropertyDto: UpdatePropertyDto,
    @GetUser() user: User,
  ) {
    return this.propertiesService.update(id, updatePropertyDto, user);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMINISTRATOR')
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.propertiesService.remove(id, user);
  }
}