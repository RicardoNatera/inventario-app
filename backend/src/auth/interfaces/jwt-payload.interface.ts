export interface JwtPayload {
  sub: number;
  email: string;
  nombre: string;
  rol: 'ADMIN' | 'USER';
}
