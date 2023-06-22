// NestFactory used to create an instance of the Nest application.
import { NestFactory } from '@nestjs/core';
// AppModule represents the root module of the application.
import { AppModule } from './app.module';

// bootstrap func is declared as an asynchronous func.

async function bootstrap() {
  // an instance of the Nest app created by calling the create method of NestFactory and passed AppModule.
  const app = await NestFactory.create(AppModule);
  // enabled Cross-Origin Resource Sharing which allows application to accept req from different domains.
  app.enableCors();
  // setting a global prefix 'api' for all routes of the app.
  app.setGlobalPrefix('api');
  // start the application and make it listen on port 5000.
  await app.listen(5000);
}
bootstrap();
