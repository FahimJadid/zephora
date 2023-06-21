import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Set the enableCors
  app.enableCors();
  // Set the global prefix
  app.setGlobalPrefix('api');
  await app.listen(5000);
}
bootstrap();
