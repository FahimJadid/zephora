// NestFactory used to create an instance of the Nest application.
import { NestFactory } from '@nestjs/core';
// AppModule represents the root module of the application.
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';

// bootstrap func is declared as an asynchronous func.

async function bootstrap() {
  // an instance of the Nest app created by calling the create method of NestFactory and passed AppModule.
  const app = await NestFactory.create(AppModule);
  // enabled Cross-Origin Resource Sharing which allows application to accept req from different domains.
  app.enableCors();
  // setting a global prefix 'api' for all routes of the app.
  app.setGlobalPrefix('api');
  const configService = app.get(ConfigService);
  // start the application and make it listen on port
  await app.listen(configService.get('PORT') || 3000);
}
bootstrap();
