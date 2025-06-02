import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles || roles.length === 0) return true;
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;

    if (!roles.includes(user.rol)) {
      throw new ForbiddenException('No tienes permisos suficientes');
    }

    return true;
  }
}
