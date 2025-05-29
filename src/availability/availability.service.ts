import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';

@Injectable()
export class AvailabilityService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAvailabilityDto) {
    return this.prisma.availability.create({ data });
  }

  async findAll() {
    return this.prisma.availability.findMany();
  }

  async findOne(id: number) {
    const availability = await this.prisma.availability.findUnique({ where: { id } });
    if (!availability) throw new NotFoundException('Disponibilidade não encontrada');
    return availability;
  }

  async update(id: number, data: UpdateAvailabilityDto) {
    await this.findOne(id);
    return this.prisma.availability.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.availability.delete({ where: { id } });
  }

  async calendarioPorImovel(hostingId: number, mes: number, ano: number) {
    const inicio = new Date(ano, mes - 1, 1);
    const fim = new Date(ano, mes, 0, 23, 59, 59);

    return this.prisma.availability.findMany({
      where: {
        hostingId,
        date: { gte: inicio, lte: fim },
      },
      orderBy: { date: 'asc' },
    });
  }
}