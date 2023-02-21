import { Controller,Post ,Body,Res,HttpStatus,Get, ValidationPipe} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgotpassword.dto';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { User } from "./schemas/user.schema";

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService){}

    @Post("/signup")
   async signUp(@Body() signUpDto: SignUpDto): Promise<{token:string}>{

        // const newUser=await this.authService.signUp(signUpDto); 
        //         return response.status(HttpStatus.CREATED).send({
        //             message:"registered successfully",
        //              newUser
        //         })  
        return await this.authService.signUp(signUpDto)
    
    
            }

            
    @Get("/login")
    async login(@Body() loginDto: LoginDto): Promise<{token:string}>{
         return await this.authService.login(loginDto) 
     
             }

    @Post("/forgotpassword"){
      async forgotPassword(@Body(now ValidationPipe()) forgotPasswordDto:ForgotPasswordDto): Promise<void>{

      }  
    }




             
 }


