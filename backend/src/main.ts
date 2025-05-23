import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitar CORS para permitir llamadas desde el frontend
  app.enableCors({
    origin: "http://localhost:3000", // o "*"
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
