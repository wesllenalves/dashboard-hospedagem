import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Realiza login e retorna um token JWT' })
  @ApiResponse({ status: 201, description: 'Login realizado com sucesso, retorna o token JWT' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: loginDto.email } });
    if (!user || user.password !== loginDto.password) {
      // Em produção, use hash de senha (bcrypt) e nunca compare senhas em texto puro!
      throw new UnauthorizedException('Credenciais inválidas');
    }
    return this.authService.login({ email: user.email, userId: user.id });
  }
}