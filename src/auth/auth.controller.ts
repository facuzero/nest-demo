import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.ACCEPTED)
  async signin(@Body() body: LoginUserDto) {
    const { email, password } = body;
    try {
      return await this.authService.signin(email, password);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('signup')
  signUp(@Body() user: CreateUserDto) {
    return this.authService.signup(user);
  }
}
