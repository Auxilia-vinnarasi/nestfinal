import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class UserService {

    private readonly saltRounds = 10;

    constructor(@InjectModel('User') private readonly userModel: Model<User>){}
    async find(id:string): Promise<User>{
        return await this.userModel.findById(id).exec();
  }

  async findByEmail(email:string) : Promise<User>{
    return await this.userModel.findOne({email}).exec();
  }

  async update(id:string,payload: Partial<User>){
        return this.userModel.updateOne({_id:id},payload);
  }

  
}
