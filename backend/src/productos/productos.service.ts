import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Producto } from '@prisma/client';

@Injectable()
export class ProductosService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<Producto[]> {
    return this.prisma.producto.findMany();
  }

  create(data: Omit<Producto, 'id'>): Promise<Producto> {
    return this.prisma.producto.create({ data });
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
