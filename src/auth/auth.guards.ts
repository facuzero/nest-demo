import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Role } from 'src/users/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException('No se envío el token');

    try {
      const secret = process.env.JWT_SECRET;
      const user = this.jwtService.verify(token, { secret });
      user.roles = user.isAdmin ? [Role.Admin] : [Role.User];
      request.user = user;
      return true;
    } catch (error) {
      if (!token) throw new UnauthorizedException('Token invalido');
    }
  }
}
