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
  async buscarConFiltros(
    q = '',
    page?: number,
    limit?: number,
    minPrecio?: number,
    maxPrecio?: number,
    stockMenorA?: number,
  ): Promise<[Producto[], number]> {
    const filtros: any = {};

    if (q) {
      filtros.nombre = { contains: q };
    }
    if (minPrecio !== undefined || maxPrecio !== undefined) {
      filtros.precio = {};
      if (minPrecio !== undefined) filtros.precio.gte = minPrecio;
      if (maxPrecio !== undefined) filtros.precio.lte = maxPrecio;
    }
    if (stockMenorA !== undefined) {
      filtros.stock = { lt: stockMenorA };
    }

    const options: any = {
      where: filtros,
      orderBy: { id: 'asc' },
    };

    if (limit !== undefined && page !== undefined) {
      options.skip = (page - 1) * limit;
      options.take = limit;
    }

    const [productos, total] = await Promise.all([
      this.prisma.producto.findMany(options),
      this.prisma.producto.count({ where: filtros }),
    ]);

    return [productos, total];
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
