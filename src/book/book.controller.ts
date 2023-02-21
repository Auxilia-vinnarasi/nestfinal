import { Controller,Get ,Post,Body,Param,Put,Delete,Query, UseGuards,Req} from '@nestjs/common';
import { Book } from 'src/book/schemas/book.schema';
import { BookService } from './book.service';
import {CreateBookDto} from "./dto/create-book.dto";
import {UpdateBookDto} from "./dto/update-book.dto";
import {Query as ExpressQuery } from "express-serve-static-core";
import { AuthGuard } from '@nestjs/passport';

@Controller('books')
export class BookController {
    constructor(private bookService: BookService){}

    @Get()
    async getAllBooks(@Query() query: ExpressQuery) : Promise<Book[]>{
        return this.bookService.findAll(query);
    }
    @Post()
    //if i need that protected routes
    @UseGuards(AuthGuard())// this will protect our root..
    async createBook(@Body() book:CreateBookDto,@Req() req): Promise<Book>{
        // console.log(req.user);
        return this.bookService.create(book,req.user);
    }
    // @Get("/:id")
    //book -->the type of book we need, the type of data we are expecting from the user for that dto is using 
    //user will add some type of data in teh body..so we have to make sure the data is good at type
    //thats why dto is used...

    @Get("/:id")
    async getBook(@Param("id") id:string ) : Promise<Book>{
        return this.bookService.findById(id);
    }

    @Put("/:id")
    async updateBook(@Param("id") id:string,@Body() book:UpdateBookDto): Promise<Book>{
        return this.bookService.updateById(id,book);
    }

    @Delete("/:id")
    async deleteBook(@Param("id") id:string ) : Promise<Book>{
        return this.bookService.deleteById(id);
    }


}
