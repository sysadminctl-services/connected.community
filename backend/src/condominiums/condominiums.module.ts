import { Module } from '@nestjs/common';
import { CondominiumsService } from './condominiums.service';
import { CondominiumsController } from './condominiums.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule], 
  controllers: [CondominiumsController],
  providers: [CondominiumsService],
})
export class CondominiumsModule {}