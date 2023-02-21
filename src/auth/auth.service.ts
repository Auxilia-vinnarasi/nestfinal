import { BadRequestException, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgotpassword.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService,
        
    ){}

    //after constructor i ahve to register my user
    async signUp(signUpDto: SignUpDto ): Promise<{token:string}> {
     const {name,email,password}= signUpDto;
    //i have to hash the password before signing in db for that npm i bcryptjs..
    const hashedPassword= await bcrypt.hash(password,10);

    const user=await this.userModel.create({
        name,
        email,
        password:hashedPassword
    })

    const token=this.jwtService.sign({ id:user._id},)
 
        return {token}
    }

  async login(loginDto:LoginDto): Promise<{token: string}>{
    const {email,password}= loginDto;
   
    const user=await this.userModel.findOne({email})
    if(!user){
        throw new UnauthorizedException("invalid email or password");
    }

    const isPasswordMatched= await bcrypt.compare(password,user.password);

    if(!isPasswordMatched){
        throw new UnauthorizedException("invalid email or password");
    }
    const token=this.jwtService.sign({ id:user._id},)
 
        return {token}

  }

  async forgotPassword(forgotPasswordDto:ForgotPasswordDto):Promise<void>{
    const user=this.userService.findByEmail(forgotPasswordDto.email);
    if(!user){
      throw new BadRequestException("Invalid email");
    }
  } 
  
  

}
 