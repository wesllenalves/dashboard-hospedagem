import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateReviewDto) {
    return this.prisma.review.create({ data });
  }

  async findAll() {
    return this.prisma.review.findMany();
  }

  async findOne(id: number) {
    const review = await this.prisma.review.findUnique({ where: { id } });
    if (!review) throw new NotFoundException('Avaliação não encontrada');
    return review;
  }

  async update(id: number, data: UpdateReviewDto) {
    await this.findOne(id);
    return this.prisma.review.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.review.delete({ where: { id } });
  }
}