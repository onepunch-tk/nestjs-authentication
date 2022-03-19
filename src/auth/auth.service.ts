import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './users.repository';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
  ) {}

  async getAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(createDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPasswrod = await bcrypt.hash(createDto.password, salt);

    const user = this.userRepository.create({...createDto, password: hashedPasswrod});
    
    try {
      await this.userRepository.save(user);
    } catch (error) {
      const code = error.code;
      
      switch (code) {
        case '23505': throw new ConflictException(`Already exists is username`);
      
        default:
          throw new InternalServerErrorException();
      }
    }

    return user;
  }
}
