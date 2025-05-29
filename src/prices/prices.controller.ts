import {
  Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,
} from '@nestjs/common';
import { PricesService } from './prices.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@ApiTags('prices')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo preço dinâmico' })
  @ApiResponse({ status: 201, description: 'Preço criado com sucesso' })
  create(@Body() dto: CreatePriceDto) {
    return this.pricesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todos os preços dinâmicos' })
  findAll() {
    return this.pricesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um preço dinâmico pelo ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: string) {
    return this.pricesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um preço dinâmico pelo ID' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id') id: string, @Body() dto: UpdatePriceDto) {
    return this.pricesService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um preço dinâmico pelo ID' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id') id: string) {
    return this.pricesService.remove(+id);
  }
}