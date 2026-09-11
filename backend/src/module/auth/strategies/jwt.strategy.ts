import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Role } from '../../../database';
import { AUTH_MESSAGES } from '../../../common';
import { AuthRepository } from '../auth.repository';

export interface JwtPayload {
  sub: string;
  email?: string | null;
  username?: string | null;
  role: Role;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authRepository: AuthRepository,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('auth.jwtSecret'),
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authRepository.findActiveUserForJwt(payload.sub);

    if (!user || !user.isActive) {
      throw new UnauthorizedException(AUTH_MESSAGES.USER_INACTIVE_OR_NOT_FOUND);
    }

    return user;
  }
}
