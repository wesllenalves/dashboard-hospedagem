import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStayDto } from './dto/create-stay.dto';
import { UpdateStayDto } from './dto/update-stay.dto';

@Injectable()
export class StaysService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateStayDto) {
    return this.prisma.stay.create({ data });
  }

  async findAll() {
    return this.prisma.stay.findMany();
  }

  async findOne(id: number) {
    const stay = await this.prisma.stay.findUnique({ where: { id } });
    if (!stay) throw new NotFoundException('Estadia não encontrada');
    return stay;
  }

  async update(id: number, data: UpdateStayDto) {
    await this.findOne(id);
    return this.prisma.stay.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.stay.delete({ where: { id } });
  }
}