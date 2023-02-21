import {Prop,SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Document } from "mongoose";
import {User} from "../../auth/schemas/user.schema";

export class PasswordResets extends Document{
    
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"User"})
    id:User;

    @Prop()
    email:string;

    @Prop()
    token:string;

}

export const PasswordResetSchema=SchemaFactory.createForClass(PasswordResets);