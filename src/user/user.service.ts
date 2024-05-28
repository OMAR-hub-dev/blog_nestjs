import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { signupDto } from './dtos/signupdto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { loginDto } from './dtos/loginDto';

@Injectable()
export class UserService {
    
    constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>,)
     {

     }

    async postSignup (body : signupDto): Promise<string>{
        try{
            const {password} = body
            const hash = await bcrypt.hash(password, 10)
            const user = this.usersRepository.create({...body, password: hash})
            await this.usersRepository.save(user)
            return "User created successfully"
        }
        catch(err){
            throw new ConflictException(err.message)            
        }        
    }

    async postLogin(body: loginDto) {
        const {password, email} = body
        const user = await this.usersRepository.findOne({where: {email: email}})
        if (!user) throw new NotFoundException("User not found")
        const match = await bcrypt.compare(password, user.password) 
        if(!match) throw new UnauthorizedException("Invalid password")
        
        return user
    }
}
