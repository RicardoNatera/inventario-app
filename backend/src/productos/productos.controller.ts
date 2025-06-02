import { Controller, UseGuards, Get, Post, Put, Delete, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Producto } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response } from 'express';
import * as ExcelJS from 'exceljs';
import * as PDFDocument from 'pdfkit';
import { Res } from '@nestjs/common';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(JwtAuthGuard)
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}
  
  @Get('pdf')
  async exportarPDF(
    @Res() res: Response,
    @Query('q') q?: string,
    @Query('minPrecio') minPrecio?: string,
    @Query('maxPrecio') maxPrecio?: string,
    @Query('stockMenorA') stockMenorA?: string,
  ) {
    const min = minPrecio ? parseFloat(minPrecio) : undefined;
    const max = maxPrecio ? parseFloat(maxPrecio) : undefined;
    const stock = stockMenorA ? parseInt(stockMenorA) : undefined;

    const [productos] = await this.productosService.buscarConFiltros(q, undefined, undefined, min, max, stock);

    const doc = new PDFDocument({ margin: 30, size: 'A4' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=productos.pdf');

    doc.pipe(res);

    // Título centrado
    doc.fontSize(18).text('Listado de productos', {
      align: 'center',
    });

    doc.moveDown(1.5);

    // Tabla (posiciones absolutas para alinear)
    const startX = 50;
    const startY = doc.y;
    const rowHeight = 20;

    // Encabezados
    doc.fontSize(12).text('ID', startX, startY);
    doc.text('Nombre', startX + 50, startY);
    doc.text('Precio', startX + 300, startY);
    doc.text('Stock', startX + 400, startY);

    let y = startY + rowHeight;

    productos.forEach((p) => {
      doc.text(p.id.toString(), startX, y);
      doc.text(p.nombre, startX + 50, y);
      doc.text(`$${p.precio}`, startX + 300, y);
      doc.text(p.stock.toString(), startX + 400, y);
      y += rowHeight;
    });

    doc.end();
  }

  @Get('excel')
  async exportarExcel(
    @Res() res: Response,
    @Query('q') q?: string,
    @Query('minPrecio') minPrecio?: string,
    @Query('maxPrecio') maxPrecio?: string,
    @Query('stockMenorA') stockMenorA?: string,
  ) {
    const min = minPrecio ? parseFloat(minPrecio) : undefined;
    const max = maxPrecio ? parseFloat(maxPrecio) : undefined;
    const stock = stockMenorA ? parseInt(stockMenorA) : undefined;

    const [productos] = await this.productosService.buscarConFiltros(q, undefined, undefined, min, max, stock);

    const workbook = new ExcelJS.Workbook();
    const hoja = workbook.addWorksheet('Productos');

    hoja.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre', key: 'nombre', width: 30 },
      { header: 'Precio', key: 'precio', width: 15 },
      { header: 'Stock', key: 'stock', width: 10 },
    ];

    productos.forEach((p) => {
      hoja.addRow(p);
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=productos.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  }

  @Get()
  async findAll(
    @Query('q') q?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('minPrecio') minPrecio?: string,
    @Query('maxPrecio') maxPrecio?: string,
    @Query('stockMenorA') stockMenorA?: string,
  ) {
    const pag = page ? parseInt(page) : undefined;
    const lim = limit ? parseInt(limit) : undefined;
    const min = minPrecio ? parseFloat(minPrecio) : undefined;
    const max = maxPrecio ? parseFloat(maxPrecio) : undefined;
    const stock = stockMenorA ? parseInt(stockMenorA) : undefined;
    
    const [productos, total] = await this.productosService.buscarConFiltros(q, pag, lim, min, max, stock);
    const totalPages = lim ? Math.ceil(total / lim) : 1;

    return {
      data: productos,
      total,
      page: pag ?? 1,
      limit: lim ?? total,
      totalPages    
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() data: Omit<Producto, 'id'>): Promise<Producto> {
    return this.productosService.create(data);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Omit<Producto, 'id'>>,
  ): Promise<Producto> {
    return this.productosService.update(id, data);
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<Producto> {
    return this.productosService.delete(id);
  }
}
