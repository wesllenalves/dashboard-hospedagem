import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateScheduleDto) {
    return this.prisma.schedule.create({ data });
  }

  async findAll() {
    return this.prisma.schedule.findMany();
  }

  async findOne(id: number) {
    const schedule = await this.prisma.schedule.findUnique({ where: { id } });
    if (!schedule) throw new NotFoundException('Agendamento não encontrado');
    return schedule;
  }

  async update(id: number, data: UpdateScheduleDto) {
    await this.findOne(id);
    return this.prisma.schedule.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.schedule.delete({ where: { id } });
  }
}