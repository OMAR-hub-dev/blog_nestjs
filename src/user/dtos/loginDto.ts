import {IsString, IsEmail, IsNotEmpty, Length} from "class-validator"
export class loginDto{
 
    
    @IsEmail()
    readonly email : string

    @IsString()
    @IsNotEmpty()
    @Length(6,50)
    readonly password : string
}