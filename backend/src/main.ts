import { CorsOptions } from './../node_modules/@nestjs/common/interfaces/external/cors-options.interface.d';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET, HEAD,PUT, PATCH, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
