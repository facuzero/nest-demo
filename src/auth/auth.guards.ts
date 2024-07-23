import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader) {
      throw new UnauthorizedException('No se encuentra Header Authorization');
    }

    const [type, credentials] = authorizationHeader.split(' ');
    if (type !== 'Basic' || !credentials) {
      throw new UnauthorizedException('Invalid Authorization header format');
    }

    const [email, password] = credentials.split(':');
    if (!email || !password) {
      throw new UnauthorizedException(
        'Invalid Authorization header credentials',
      );
    }

    return true;
  }
}
