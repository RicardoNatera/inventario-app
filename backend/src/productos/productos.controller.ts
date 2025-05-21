import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Producto } from '@prisma/client';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  findAll(): Promise<Producto[]> {
    return this.productosService.findAll();
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
