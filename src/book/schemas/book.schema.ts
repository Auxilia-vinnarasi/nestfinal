import {Prop,Schema,SchemaFactory} from "@nestjs/mongoose";
import mongoose from "mongoose";
import {User} from "../../auth/schemas/user.schema";

export enum Category{
    ADVENTURE = "Adventure",
    CLASSICS = "classics",
    CRIME = "crime",
    FANTASY = "fantasy",
}
@Schema({
    timestamps: true
})

export class Book {
    @Prop()
    title: string;
    @Prop()
    description: string;
    @Prop()
    author: string;
    @Prop()
    price: number;
    @Prop()
    category:Category;
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"User"})
    user:User;
}

export const BookSchema = SchemaFactory.createForClass(Book)