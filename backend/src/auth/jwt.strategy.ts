import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secreto_super_seguro', // usar env en producción
    });
  }

  async validate(payload: any) {
    return {
      sub: payload.sub,
      email: payload.email,
      nombre: payload.nombre,
      rol: payload.rol,
    };
  }
}
