import {IsNotEmpty,IsString,IsEmail, MinLength} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ForgotPasswordDto{
    @IsNotEmpty()
    @ApiProperty()
    // @IsEmail({},{message:"Please enter correct email"})
    // readonly 
    email : string;

    // @IsNotEmpty()
    // @IsString()
    // @MinLength(6)
    // readonly password : string;
}