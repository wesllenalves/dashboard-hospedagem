import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('financeiro')
  @ApiOperation({ summary: 'Resumo financeiro por período' })
  @ApiQuery({ name: 'inicio', required: true, type: String, example: '2024-07-01' })
  @ApiQuery({ name: 'fim', required: true, type: String, example: '2024-07-31' })
  async resumoFinanceiro(@Query('inicio') inicio: string, @Query('fim') fim: string) {
    return this.reportsService.resumoFinanceiroPorPeriodo(inicio, fim);
  }
}