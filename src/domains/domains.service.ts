import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDomainDto } from './dto/create-domain.dto';
import { UpdateDomainDto } from './dto/update-domain.dto';

@Injectable()
export class DomainsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateDomainDto) {
    return this.prisma.domain.create({ data });
  }

  async findAll() {
    return this.prisma.domain.findMany();
  }

  async findOne(id: number) {
    const domain = await this.prisma.domain.findUnique({ where: { id } });
    if (!domain) throw new NotFoundException('Domínio não encontrado');
    return domain;
  }

  async update(id: number, data: UpdateDomainDto) {
    await this.findOne(id);
    return this.prisma.domain.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.domain.delete({ where: { id } });
  }
}
