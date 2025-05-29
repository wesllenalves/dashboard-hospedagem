import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { UsersService } from '../users/users.service'; // Optional: for actual user validation

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    // private usersService: UsersService, // Optional: for actual user validation
  ) {}

  /**
   * Generates a JWT access token for a given user.
   * @param user An object representing the user, e.g., { email: string; userId: number }
   * @returns An object containing the access_token.
   */
  async login(user: { email: string; userId: number }) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Validates a user based on the JWT payload.
   * This method is called by JwtStrategy if configured to delegate validation,
   * or can be used by other parts of the auth system (e.g., local strategy).
   * With the current JwtStrategy, its validate method directly returns the user object.
   * @param payload The JWT payload, e.g., { sub: number (userId), email: string }
   * @returns The user object if validation is successful, otherwise null or throws an error.
   */
  async validateUser(payload: { sub: number; email: string }): Promise<any> {
    // In a real application, you might fetch the full user object from the database here
    // using something like `this.usersService.findById(payload.sub)`
    // to ensure the user still exists, is active, etc.
    // For this example, we're just returning the essential info from the payload.
    return { userId: payload.sub, email: payload.email };
  }
}
