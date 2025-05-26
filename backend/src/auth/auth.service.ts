import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Rol } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService
  ) {}

  async validarUsuario(email: string, password: string) {
    const user = await this.usuariosService.buscarPorEmail(email);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    const esValido = await bcrypt.compare(password, user.password);
    if (!esValido) throw new UnauthorizedException('Contraseña incorrecta');

    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validarUsuario(email, password);
    const payload = {
      sub: user.id,
      email: user.email,
      nombre: user.nombre,
      rol: user.rol,
    };
    const token = this.jwtService.sign(payload);
    return { access_token: token, nombre: user.nombre };
  }

  async register(nombre: string, email: string, password: string, rol:string) {
    const user = await this.usuariosService.crearUsuario(nombre, email, password,(Rol as any)[rol] || Rol.USER);
    const payload = {
      sub: user.id,
      email: user.email,
      nombre: user.nombre,
      rol: user.rol,
    };
    const token = this.jwtService.sign(payload);
    return { access_token: token, nombre: user.nombre };
  }
}
