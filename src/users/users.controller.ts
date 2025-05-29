import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Retorna o perfil do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil do usuário retornado com sucesso' })
  getProfile(@Request() req) {
    return req.user;
  }
}

export class CreateUserDto {
  @ApiProperty({ example: 'user@email.com' })
  email: string;

  @ApiProperty({ example: 'senha123' })
  password: string;

  @ApiProperty({ example: 'João', required: false })
  name?: string;
}
