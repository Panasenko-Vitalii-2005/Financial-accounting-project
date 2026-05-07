import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: number) {
    return this.prisma.category.findMany({
      where: { userId },
      orderBy: [{ type: 'asc' }, { name: 'asc' }],
    });
  }

  async create(userId: number, dto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: { ...dto, userId },
    });
  }

  async update(userId: number, categoryId: number, dto: UpdateCategoryDto) {
    const category = await this.findOwned(userId, categoryId);
    return this.prisma.category.update({
      where: { id: category.id },
      data: dto,
    });
  }

  async remove(userId: number, categoryId: number, transferToId?: number) {
    const category = await this.findOwned(userId, categoryId);

    const transactionCount = await this.prisma.transaction.count({
      where: { categoryId: category.id },
    });

    if (transactionCount > 0) {
      if (!transferToId) {
        throw new BadRequestException(
          `Category has ${transactionCount} transactions. Provide transferToId to move them.`,
        );
      }
      const target = await this.findOwned(userId, transferToId);
      await this.prisma.transaction.updateMany({
        where: { categoryId: category.id },
        data: { categoryId: target.id },
      });
    }

    await this.prisma.category.delete({ where: { id: category.id } });
    return { message: 'Category deleted' };
  }

  private async findOwned(userId: number, categoryId: number) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) throw new NotFoundException('Category not found');
    if (category.userId !== userId) throw new ForbiddenException();
    return category;
  }
}
