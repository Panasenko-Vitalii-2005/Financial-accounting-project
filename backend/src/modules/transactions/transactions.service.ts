import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { FilterTransactionsDto } from './dto/filter-transactions.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: number, filters: FilterTransactionsDto) {
    const dateFilter: Prisma.DateTimeFilter = {};
    if (filters.dateFrom) dateFilter.gte = new Date(filters.dateFrom);
    if (filters.dateTo) {
      const end = new Date(filters.dateTo);
      end.setHours(23, 59, 59, 999);
      dateFilter.lte = end;
    }

    const amountFilter: Prisma.DecimalFilter = {};
    if (filters.minAmount !== undefined) amountFilter.gte = filters.minAmount;
    if (filters.maxAmount !== undefined) amountFilter.lte = filters.maxAmount;

    const where: Prisma.TransactionWhereInput = {
      userId,
      ...(Object.keys(dateFilter).length > 0 && { date: dateFilter }),
      ...(filters.categoryId && { categoryId: filters.categoryId }),
      ...(filters.type && { category: { type: filters.type } }),
      ...(Object.keys(amountFilter).length > 0 && { amount: amountFilter }),
    };

    const sortBy = filters.sortBy || 'date';
    const sortOrder = filters.sortOrder || 'desc';
    const orderBy: Prisma.TransactionOrderByWithRelationInput = { [sortBy]: sortOrder };

    return this.prisma.transaction.findMany({
      where,
      include: { category: true },
      orderBy,
    });
  }

  async create(userId: number, dto: CreateTransactionDto) {
    await this.validateCategoryOwnership(userId, dto.categoryId);
    return this.prisma.transaction.create({
      data: {
        amount: dto.amount,
        date: new Date(dto.date),
        description: dto.description,
        userId,
        categoryId: dto.categoryId,
      },
      include: { category: true },
    });
  }

  async update(userId: number, transactionId: number, dto: UpdateTransactionDto) {
    const transaction = await this.findOwned(userId, transactionId);

    if (dto.categoryId) {
      await this.validateCategoryOwnership(userId, dto.categoryId);
    }

    return this.prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        ...(dto.amount !== undefined && { amount: dto.amount }),
        ...(dto.date && { date: new Date(dto.date) }),
        ...(dto.categoryId && { categoryId: dto.categoryId }),
        ...(dto.description !== undefined && { description: dto.description }),
      },
      include: { category: true },
    });
  }

  async remove(userId: number, transactionId: number) {
    const transaction = await this.findOwned(userId, transactionId);
    await this.prisma.transaction.delete({ where: { id: transaction.id } });
    return { message: 'Transaction deleted' };
  }

  async exportCsv(userId: number, filters: FilterTransactionsDto): Promise<string> {
    const transactions = await this.findAll(userId, filters);
    const header = 'Date,Category,Type,Amount,Description';
    const rows = transactions.map((t) => {
      const date = new Date(t.date).toISOString().split('T')[0];
      const amount = Number(t.amount).toFixed(2);
      const desc = t.description ? `"${t.description.replace(/"/g, '""')}"` : '';
      return `${date},${t.category.name},${t.category.type},${amount},${desc}`;
    });
    return [header, ...rows].join('\n');
  }

  private async findOwned(userId: number, transactionId: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id: transactionId },
    });
    if (!transaction) throw new NotFoundException('Transaction not found');
    if (transaction.userId !== userId) throw new ForbiddenException();
    return transaction;
  }

  private async validateCategoryOwnership(userId: number, categoryId: number) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) throw new NotFoundException('Category not found');
    if (category.userId !== userId) throw new ForbiddenException();
    return category;
  }
}
