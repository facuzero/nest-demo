import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/users/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.ACCEPTED)
  signin(@Body() loginDto: LoginUserDto) {
    try {
      return this.authService.signin(loginDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('signup')
  signUp(@Body() user: CreateUserDto) {
    return this.authService.signup(user);
  }

  @Post('toAdmin/:id')
  toAdmin(@Param('id') id: string) {
    return this.authService.toAdmin(id);
  }
}
