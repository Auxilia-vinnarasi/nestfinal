import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { PasswordModule } from './password/password.module';
import { GoogleStrategy } from './google.strategy';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({  
      envFilePath:".env",
      isGlobal:true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    BookModule,
    AuthModule,
  MulterModule.register({
    dest:"./uploads"
  }),
  PasswordModule
],
  controllers: [AppController], 
  providers: [AppService,GoogleStrategy, UserService],
})
export class AppModule {}
