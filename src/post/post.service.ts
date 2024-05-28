import { ConflictException, Injectable } from '@nestjs/common';
import { addPostDto } from './dtos/addPostDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class PostService {
    constructor(@InjectRepository(Post) private readonly usersRepository: Repository<Post>,) { }
    async postAddpost(body: addPostDto, user:User) {
        try {
            const article =this.usersRepository.create(body)
            article.user = user
            await this.usersRepository.save(article)
            return "article added successfully"
        }
        catch(err){ throw new ConflictException(err.message)}
    }
}
