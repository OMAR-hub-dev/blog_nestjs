import { Body, Controller, Get, Post, Render, Session } from '@nestjs/common';
import { addPostDto } from './dtos/addPostDto';
import { PostService } from './post.service';
import { User } from 'src/user/user.entity';


@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService){

    }
    @Get('/add')
    @Render('post/addPost')
    getaddPost() {}

    @Post('/add')
    async postAddpost(@Body() body: addPostDto, @Session() session: Record<string, any>){
        const currentUser : User=session.user;
        return { message: await this.postService.postAddpost(body, currentUser) };
    }

}
