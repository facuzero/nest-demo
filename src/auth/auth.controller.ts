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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Iniciar sesión' })
  signin(@Body() loginDto: LoginUserDto) {
    try {
      return this.authService.signin(loginDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrarse' })
  signUp(@Body() user: CreateUserDto) {
    return this.authService.signup(user);
  }

  @Post('toAdmin/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Hacer usuario administrador' })
  toAdmin(@Param('id') id: string) {
    return this.authService.toAdmin(id);
  }
}
