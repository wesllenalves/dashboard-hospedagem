import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHostingDto } from './dto/create-hosting.dto';
import { UpdateHostingDto } from './dto/update-hosting.dto';

@Injectable()
export class HostingsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateHostingDto) {
    return this.prisma.hosting.create({ data });
  }

  async findAll() {
    return this.prisma.hosting.findMany();
  }

  async findOne(id: number) {
    const hosting = await this.prisma.hosting.findUnique({ where: { id } });
    if (!hosting) throw new NotFoundException('Hospedagem não encontrada');
    return hosting;
  }

  async update(id: number, data: UpdateHostingDto) {
    await this.findOne(id);
    return this.prisma.hosting.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.hosting.delete({ where: { id } });
  }
}
