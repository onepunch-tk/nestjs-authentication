import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { User } from './users.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.authService.getAllUser();
  }

  @Post('/signup')
  signUp(@Body(ValidationPipe)createDto: CreateUserDto): Promise<User> {
    return this.authService.createUser(createDto);
  }
}
