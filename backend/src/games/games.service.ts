import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GamesService {
  constructor(private prisma: PrismaService) {}

  async findAll(page: number, limit: number, search?: string, categorySlug?: string) {
    const skip = (page - 1) * limit;
    const where: Prisma.GameWhereInput = {
      status: 'ACTIVE',
      ...(search && { name: { contains: search, mode: 'insensitive' } }),
      ...(categorySlug && { category: { slug: categorySlug } }),
    };

    const [data, total] = await Promise.all([
      this.prisma.game.findMany({
        where,
        skip,
        take: limit,
        include: { category: true },
        orderBy: [{ is_featured: 'desc' }, { created_at: 'desc' }],
      }),
      this.prisma.game.count({ where }),
    ]);

    return {
      data,
      meta: { total, page, limit },
    };
  }

  async findOne(id: string) {
    const game = await this.prisma.game.findUnique({
      where: { id },
      include: { category: true },
    });
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }

  async create(data: any) {
    return this.prisma.game.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.game.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.game.delete({ where: { id } });
  }
}
