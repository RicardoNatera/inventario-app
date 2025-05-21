import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Producto } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductosService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<Producto[]> {
    return this.prisma.producto.findMany();
  }

  async create(data: Omit<Producto, 'id'>): Promise<Producto> {
    // Validación previa
    const existente = await this.prisma.producto.findFirst({
      where: { nombre: data.nombre },
    });

    if (existente) {
      throw new BadRequestException(`Ya existe un producto con el nombre "${data.nombre}".`);
    }

    try {
      return await this.prisma.producto.create({ data });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException(`Duplicado: el nombre "${data.nombre}" ya existe.`);
      }
      throw new InternalServerErrorException('Error al crear el producto');
    }
  }


  update(id: number, data: Partial<Omit<Producto, 'id'>>): Promise<Producto> {
    return this.prisma.producto.update({
      where: { id },
      data,
    });
  }

  delete(id: number): Promise<Producto> {
    return this.prisma.producto.delete({ where: { id } });
  }
}
