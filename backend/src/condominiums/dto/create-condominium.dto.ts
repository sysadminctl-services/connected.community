import { IsString, IsNotEmpty, IsOptional, IsInt, IsPhoneNumber } from 'class-validator';

export class CreateCondominiumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @IsString()
  @IsNotEmpty()
  municipality: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  exteriorNumber: string;

  @IsString()
  @IsOptional()
  interiorNumber?: string;

  @IsString()
  @IsOptional()
  logoUrl?: string;

  @IsPhoneNumber('MX')
  @IsOptional()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  taxId: string;

  @IsString()
  @IsNotEmpty()
  fiscalRegimeCode: string;

  @IsInt()
  @IsNotEmpty()
  administratorId: number;
}