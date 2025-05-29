import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
// import { ConfigModule, ConfigService } from '@nestjs/config'; // Example if using ConfigService

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      // If ConfigModule and ConfigService were fully set up and JWT_SECRET was sourced from there:
      // imports: [ConfigModule], // ensure ConfigModule is imported if you use ConfigService
      // useFactory: async (configService: ConfigService) => ({
      //   secret: configService.get<string>('JWT_SECRET'),
      //   signOptions: { expiresIn: '60m' },
      // }),
      // inject: [ConfigService],
      // For now, using process.env directly as JwtStrategy does:
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '60m' }, // Token expiration time
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule, PassportModule], // Export AuthService if it's used elsewhere
})
export class AuthModule {}
