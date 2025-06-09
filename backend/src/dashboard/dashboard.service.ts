import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    // Exemplo simples, expanda conforme necessário!
    const totalHostings = await this.prisma.hosting.count();
    const totalStays = await this.prisma.stay.count();
    const totalPayments = await this.prisma.payment.count();
    const totalSchedules = await this.prisma.schedule.count();
    return {
      totalHostings,
      totalStays,
      totalPayments,
      totalSchedules,
    };
  }
}