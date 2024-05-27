import { Controller, Get, Render } from '@nestjs/common';

@Controller('user')
export class UserController {


    @Render("user/signup") 
    @Get("/signup")
    getSignup(){  }


    @Render("user/login")
    @Get("/login")
    getLogin(){ }
}
 