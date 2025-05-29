import {
  Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,
} from '@nestjs/common';
import { StaysService } from './stays.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateStayDto } from './dto/create-stay.dto';
import { UpdateStayDto } from './dto/update-stay.dto';

@ApiTags('stays')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('stays')
export class StaysController {
  constructor(private readonly staysService: StaysService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova estadia' })
  @ApiResponse({ status: 201, description: 'Estadia criada com sucesso' })
  create(@Body() dto: CreateStayDto) {
    return this.staysService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as estadias' })
  findAll() {
    return this.staysService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma estadia pelo ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: string) {
    return this.staysService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma estadia pelo ID' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id') id: string, @Body() dto: UpdateStayDto) {
    return this.staysService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma estadia pelo ID' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id') id: string) {
    return this.staysService.remove(+id);
  }
}