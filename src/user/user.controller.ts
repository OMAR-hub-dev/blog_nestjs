import {
  Controller,
  Get,
  Render,
  Post,
  Body,
  Redirect,
  UseInterceptors,
  ClassSerializerInterceptor,
  Session,
} from '@nestjs/common';
import { signupDto } from './dtos/signupdto';
import { UserService } from './user.service';
import { loginDto } from './dtos/loginDto';

@Controller('user')
export class UserController {
  constructor(private readonly userServicr: UserService) {}

  @Render('user/signup')
  @Get('/signup')
  getSignup() {}

  @Render('user/login')
  @Get('/login')
  getLogin() {}

  @Post('/signup')
  @Redirect('/user/login')
  async postSignup(@Body() body: signupDto) {
    return { message: await this.userServicr.postSignup(body) };
  }
  // le userInterceptors c'est pour exclure des données souhaitées (password) d'une maniere local
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/login')
  @Redirect('/')
  async postLogin(
    @Body() body: loginDto,
    @Session() session: Record<string, any>,
  ) {
    const user = await this.userServicr.postLogin(body);
    session.user = user;
    session.connected = true;
  }

  @Post('/logout')
  @Redirect('/user/login')
  postLogout(@Session() session: Record<string, any>) {
    session.destroy(error =>error.message);
  }
}
