import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Ensure JWT_SECRET is set in your .env file
    });
  }

  async validate(payload: any) {
    // For now, we'll assume the payload contains 'sub' (subject, typically user ID)
    // and 'email'. Adjust according to your JWT payload structure.
    return { userId: payload.sub, email: payload.email };
  }
}
