import {
  Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,
} from '@nestjs/common';
import { HostingsService } from './hostings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateHostingDto } from './dto/create-hosting.dto';
import { UpdateHostingDto } from './dto/update-hosting.dto';

@ApiTags('hostings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('hostings')
export class HostingsController {
  constructor(private readonly hostingsService: HostingsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova hospedagem' })
  @ApiResponse({ status: 201, description: 'Hospedagem criada com sucesso' })
  create(@Body() dto: CreateHostingDto) {
    return this.hostingsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as hospedagens' })
  findAll() {
    return this.hostingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma hospedagem pelo ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: string) {
    return this.hostingsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma hospedagem pelo ID' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id') id: string, @Body() dto: UpdateHostingDto) {
    return this.hostingsService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma hospedagem pelo ID' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id') id: string) {
    return this.hostingsService.remove(+id);
  }
}