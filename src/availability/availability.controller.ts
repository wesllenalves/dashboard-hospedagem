import {
  Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query,
} from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';

@ApiTags('availability')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova disponibilidade' })
  @ApiResponse({ status: 201, description: 'Disponibilidade criada com sucesso' })
  create(@Body() dto: CreateAvailabilityDto) {
    return this.availabilityService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as disponibilidades' })
  findAll() {
    return this.availabilityService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma disponibilidade pelo ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: string) {
    return this.availabilityService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza uma disponibilidade pelo ID' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id') id: string, @Body() dto: UpdateAvailabilityDto) {
    return this.availabilityService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma disponibilidade pelo ID' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id') id: string) {
    return this.availabilityService.remove(+id);
  }

  @Get('calendario/:hostingId')
  @ApiOperation({ summary: 'Calendário de disponibilidade do imóvel no mês' })
  @ApiParam({ name: 'hostingId', type: Number })
  @ApiQuery({ name: 'mes', required: true, type: Number, example: 7 })
  @ApiQuery({ name: 'ano', required: true, type: Number, example: 2024 })
  calendario(
    @Param('hostingId') hostingId: string,
    @Query('mes') mes: string,
    @Query('ano') ano: string,
  ) {
    return this.availabilityService.calendarioPorImovel(+hostingId, +mes, +ano);
  }
}