import { Controller, UseGuards, Get, Post, Put, Delete, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Producto } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  async findAll(
    @Query('q') q?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pag = page ? parseInt(page) : undefined;
    const lim = limit ? parseInt(limit) : undefined;

    const [productos, total] = await this.productosService.buscarConFiltros(q, pag, lim);
    const totalPages = lim ? Math.ceil(total / lim) : 1;

    return {
      data: productos,
      total,
      page: pag ?? 1,
      limit: lim ?? total,
      totalPages    
    };
  }


  @Post()
  create(@Body() data: Omit<Producto, 'id'>): Promise<Producto> {
    return this.productosService.create(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Omit<Producto, 'id'>>,
  ): Promise<Producto> {
    return this.productosService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<Producto> {
    return this.productosService.delete(id);
  }
}
