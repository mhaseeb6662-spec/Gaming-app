import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GameCategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAllPublic() {
    return this.prisma.gameCategory.findMany({
      where: { status: 'ACTIVE' },
    });
  }

  async create(data: any) {
    return this.prisma.gameCategory.create({ data });
  }

  async update(id: string, data: any) {
    const category = await this.prisma.gameCategory.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    return this.prisma.gameCategory.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.gameCategory.delete({ where: { id } });
  }
}
