import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMessageDto) {
    return this.prisma.message.create({ data });
  }

  async findAll() {
    return this.prisma.message.findMany();
  }

  async findOne(id: number) {
    const message = await this.prisma.message.findUnique({ where: { id } });
    if (!message) throw new NotFoundException('Mensagem não encontrada');
    return message;
  }

  async update(id: number, data: UpdateMessageDto) {
    await this.findOne(id);
    return this.prisma.message.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.message.delete({ where: { id } });
  }
}