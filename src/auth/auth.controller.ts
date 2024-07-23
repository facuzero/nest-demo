import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  getSignin(@Body() email: string, password: string) {
    return this.authService.signin(email, password);
  }
}
