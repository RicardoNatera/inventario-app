import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Rol } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: { nombre: string; email: string; password: string, rol?:Rol }) {
    const { nombre, email, password, rol } = body;
    return this.authService.register(nombre, email, password, rol ?? 'USER');
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }
}
