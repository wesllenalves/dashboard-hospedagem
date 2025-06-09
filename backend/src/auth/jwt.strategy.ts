import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in the environment variables');
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret, // Ensure JWT_SECRET is set in your .env file
    });
  }

  async validate(payload: any) {
    // For now, we'll assume the payload contains 'sub' (subject, typically user ID)
    // and 'email'. Adjust according to your JWT payload structure.
    return { userId: payload.sub, email: payload.email };
  }
}
