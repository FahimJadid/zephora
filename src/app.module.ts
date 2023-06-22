// Import the necessary modules from the '@nestjs/common' and other files
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

// used to define a module in a Nest app.
@Module({
  // Specify the modules that need to be imported.
  imports: [
    // used with forRoot() method to load env variables from the .env.
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    // used with forRootAsync() method to connect to MongoDB using the provided URI from env variables.
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        uri: process.env.DB_STRING, // Use your specific environment variable for the MongoDB URI.
      }),
    }),
    // Other custom modules are imported.
    ProductModule,
    UserModule,
    AuthModule,
  ],
  // used to specify the controllers
  controllers: [AppController],
  // specify the services (providers)
  providers: [AppService],
})
export class AppModule {}
