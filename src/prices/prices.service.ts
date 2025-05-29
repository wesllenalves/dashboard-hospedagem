import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Injectable()
export class PricesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePriceDto) {
    return this.prisma.price.create({ data });
  }

  async findAll() {
    return this.prisma.price.findMany();
  }

  async findOne(id: number) {
    const price = await this.prisma.price.findUnique({ where: { id } });
    if (!price) throw new NotFoundException('Preço não encontrado');
    return price;
  }

  async update(id: number, data: UpdatePriceDto) {
    await this.findOne(id);
    return this.prisma.price.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.price.delete({ where: { id } });
  }
}