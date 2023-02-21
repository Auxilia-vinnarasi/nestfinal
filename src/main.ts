import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder,SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors : true});
  const config=new DocumentBuilder()
  .setTitle("swagger Test for nestjs")
  .setDescription("This is the test of swagger api- nestjs")
  .setVersion("1.0")
  .addTag("Documentation NestJs")
  .build();

  const document=SwaggerModule.createDocument(app,config);
  SwaggerModule.setup("api",app,document);
  
  app.useGlobalPipes(new ValidationPipe());
  // await app.listen(5000);
  await app.listen(3000);
}
bootstrap();