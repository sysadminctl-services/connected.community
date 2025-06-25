import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CondominiumsModule } from './condominiums/condominiums.module';
import { PropertiesModule } from './properties/properties.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [AuthModule, PrismaModule, CondominiumsModule, PropertiesModule, RolesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}