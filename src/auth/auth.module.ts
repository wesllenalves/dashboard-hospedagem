import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '60m' },
      }),
    }),
    PrismaModule, // Adicione o PrismaModule para injetar PrismaService
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController], // Adicione o controller aqui
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
