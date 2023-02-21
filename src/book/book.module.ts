import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import {MongooseModule} from "@nestjs/mongoose";
import { BookSchema } from 'src/book/schemas/book.schema';
import { AuthModule } from 'src/auth/auth.module';

//add authmodule in book module
@Module({
  imports:[
    AuthModule,
    MongooseModule.forFeature([{name:"Book",schema:BookSchema}])],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
