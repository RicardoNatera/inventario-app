import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Usuario, Rol } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  async crearUsuario(nombre: string, email: string, password: string, rol?: Rol) : Promise<Usuario> {
    const existe = await this.prisma.usuario.findUnique({ where: { email } });
    if (existe) {
      throw new Error('Ya existe un usuario con ese correo');
    }

    const hashed = await bcrypt.hash(password, 10);
    return this.prisma.usuario.create({
      data: { nombre, email, password: hashed, rol: rol ?? Rol.USER },
    });
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({ where: { email } });
  }
}