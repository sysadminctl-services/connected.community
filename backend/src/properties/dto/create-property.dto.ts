import { IsString, IsNotEmpty, IsOptional, IsInt, IsEnum } from 'class-validator';
import { PropertyType } from '@prisma/client';

export class CreatePropertyDto {
  @IsEnum(PropertyType)
  @IsNotEmpty()
  type: PropertyType;

  @IsString()
  @IsNotEmpty()
  identifier: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsNotEmpty()
  condominiumId: number;

  @IsInt()
  @IsOptional()
  ownerId?: number;
}