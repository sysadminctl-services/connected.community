import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async register(userData: any) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const newUser = await this.prisma.usuario.create({
      data: {
        nombre: userData.nombre,
        email: userData.email,
        password: hashedPassword,
        rolId: 1, // <-- OJO AQUÍ
      },
    });

    const { password, ...result } = newUser;

    return result;
  }

  async login(loginData: any) {
    const user = await this.prisma.usuario.findUnique({
      where: { email: loginData.email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordMatching = await bcrypt.compare(
      loginData.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: user.id, email: user.email, rolId: user.rolId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

}