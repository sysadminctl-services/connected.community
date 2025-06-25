import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password?: string;

  @IsInt()
  @IsOptional()
  roleId?: number;
}