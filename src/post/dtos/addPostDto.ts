import {IsString, IsEmail, IsNotEmpty, Length} from "class-validator"
export class addPostDto{
 
    
    @IsString()
    @IsNotEmpty()
    @Length(6,100)
    readonly title : string

    @IsString()
    @IsNotEmpty()
    @Length(8,250)
    readonly content : string
}