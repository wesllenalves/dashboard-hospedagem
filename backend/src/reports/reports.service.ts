import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async resumoFinanceiroPorPeriodo(inicio: string, fim: string) {
    const totalRecebido = await this.prisma.payment.aggregate({
      _sum: { amount: true },
      where: {
        paidAt: {
          gte: new Date(inicio),
          lte: new Date(fim),
        },
        status: 'pago',
      },
    });

    const pendentes = await this.prisma.payment.findMany({
      where: { status: 'pendente', paidAt: { gte: new Date(inicio), lte: new Date(fim) } },
    });

    return {
      totalRecebido: totalRecebido._sum.amount || 0,
      pagamentosPendentes: pendentes,
    };
  }
}