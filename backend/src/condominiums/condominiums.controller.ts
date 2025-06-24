import { Controller, Post, Body, UseGuards, Get, Param, ParseIntPipe, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CondominiumsService } from './condominiums.service';
import { CreateCondominiumDto } from './dto/create-condominium.dto';
import { UpdateCondominiumDto } from './dto/update-condominium.dto';
import { User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('condominiums')
@UseGuards(AuthGuard('jwt'))
export class CondominiumsController {
  constructor(private readonly condominiumsService: CondominiumsService) { }

  @Post()
  @UseGuards(RolesGuard)
  @Roles('ADMINISTRATOR')
  create(@Body() createCondominiumDto: CreateCondominiumDto) {
    return this.condominiumsService.create(createCondominiumDto);
  }

  @Get()
  findAll() {
    return this.condominiumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.condominiumsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMINISTRATOR')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCondominiumDto: UpdateCondominiumDto,
    @GetUser() user: User, 
  ) {
    return this.condominiumsService.update(id, updateCondominiumDto, user);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('ADMINISTRATOR')
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.condominiumsService.remove(id, user);
  }

}
