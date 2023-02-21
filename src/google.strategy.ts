import { PassportStrategy } from "@nestjs/passport";
import { Strategy,VerifyCallback } from "passport-google-oauth20";
require("dotenv").config();
import {Injectable} from "@nestjs/common";

//its more like a service kind of file
@Injectable()


export class GoogleStrategy extends PassportStrategy(Strategy,"google"){
    constructor(){
        super({
            //declare all the clientid,cb,email,picture whatever from google
            clientID:"637304203642-upl0j30mfdod0dh7bng6fe0371raiv74.apps.googleusercontent.com",
            clientSecret:"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",
            callbackURL:"http://localhost:3000/auth/google/callback",
            scope: ["email","profile"]
        })
    }
//validate method-  to access all the validate token
//will return one promise the type is any..
    async validate(accessToken: string,refreshToken:string,profile:any,done: VerifyCallback):Promise<any>{
        const {name,emails,photos} = profile
        const user={
            email:emails[0].value,
            firstName:name.givenName,
            lastName:name.familyName,
            picture:photos[0].value,
            accessToken
        }
        done(null,user);
    }
   
}