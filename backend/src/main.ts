import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setting CORS option
  const corsOptions: CorsOptions = {
    origin: process.env.FRONTEND_URL, // URL of your frontend
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies or authentication headers
    allowedHeaders: 'Content-Type, Authorization',
  };

  app.enableCors(corsOptions);

  await app.listen(3000);
}
bootstrap();
