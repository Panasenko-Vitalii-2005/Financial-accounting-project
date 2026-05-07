import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ReportPeriodDto } from './dto/report-period.dto';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getBalance(userId: number, period?: ReportPeriodDto) {
    const where = this.buildWhere(userId, period);

    const transactions = await this.prisma.transaction.findMany({
      where,
      include: { category: true },
    });

    let income = 0;
    let expense = 0;

    for (const t of transactions) {
      const amount = Number(t.amount);
      if (t.category.type === 'INCOME') income += amount;
      else expense += amount;
    }

    return {
      income: Number(income.toFixed(2)),
      expense: Number(expense.toFixed(2)),
      balance: Number((income - expense).toFixed(2)),
    };
  }

  async getCategoryReport(userId: number, type: 'INCOME' | 'EXPENSE', period?: ReportPeriodDto) {
    const where: Prisma.TransactionWhereInput = {
      ...this.buildWhere(userId, period),
      category: { type },
    };

    const transactions = await this.prisma.transaction.findMany({
      where,
      include: { category: true },
    });

    const map = new Map<number, { categoryId: number; name: string; total: number }>();

    for (const t of transactions) {
      const key = t.categoryId;
      if (!map.has(key)) {
        map.set(key, { categoryId: t.categoryId, name: t.category.name, total: 0 });
      }
      map.get(key)!.total += Number(t.amount);
    }

    return Array.from(map.values())
      .map((v) => ({ ...v, total: Number(v.total.toFixed(2)) }))
      .sort((a, b) => b.total - a.total);
  }

  async getTimeline(userId: number, groupBy: 'day' | 'week' | 'month', period?: ReportPeriodDto) {
    const where = this.buildWhere(userId, period);

    const transactions = await this.prisma.transaction.findMany({
      where,
      include: { category: true },
      orderBy: { date: 'asc' },
    });

    const map = new Map<string, { label: string; income: number; expense: number }>();

    for (const t of transactions) {
      const label = this.getGroupLabel(t.date, groupBy);
      if (!map.has(label)) map.set(label, { label, income: 0, expense: 0 });
      const entry = map.get(label)!;
      if (t.category.type === 'INCOME') entry.income += Number(t.amount);
      else entry.expense += Number(t.amount);
    }

    return Array.from(map.values()).map((v) => ({
      label: v.label,
      income: Number(v.income.toFixed(2)),
      expense: Number(v.expense.toFixed(2)),
    }));
  }

  async getTopExpenses(userId: number, limit = 10, period?: ReportPeriodDto) {
    const where: Prisma.TransactionWhereInput = {
      ...this.buildWhere(userId, period),
      category: { type: 'EXPENSE' },
    };

    const transactions = await this.prisma.transaction.findMany({
      where,
      include: { category: true },
    });

    const map = new Map<number, { categoryId: number; name: string; total: number }>();
    for (const t of transactions) {
      const key = t.categoryId;
      if (!map.has(key)) map.set(key, { categoryId: t.categoryId, name: t.category.name, total: 0 });
      map.get(key)!.total += Number(t.amount);
    }

    return Array.from(map.values())
      .map((v) => ({ ...v, total: Number(v.total.toFixed(2)) }))
      .sort((a, b) => b.total - a.total)
      .slice(0, limit);
  }

  async getDetailedReport(userId: number, period: ReportPeriodDto) {
    const balance = await this.getBalance(userId, period);
    const transactions = await this.prisma.transaction.findMany({
      where: this.buildWhere(userId, period),
      include: { category: true },
      orderBy: { date: 'desc' },
    });
    return { ...balance, transactions };
  }

  private buildWhere(userId: number, period?: ReportPeriodDto): Prisma.TransactionWhereInput {
    const dateFilter: Prisma.DateTimeFilter = {};
    if (period?.dateFrom) dateFilter.gte = new Date(period.dateFrom);
    if (period?.dateTo) {
      const end = new Date(period.dateTo);
      end.setHours(23, 59, 59, 999);
      dateFilter.lte = end;
    }
    return {
      userId,
      ...(Object.keys(dateFilter).length > 0 && { date: dateFilter }),
    };
  }

  private getGroupLabel(date: Date, groupBy: string): string {
    const d = new Date(date);
    if (groupBy === 'day') return d.toISOString().split('T')[0];
    if (groupBy === 'month') return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    // week
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(d.setDate(diff));
    return monday.toISOString().split('T')[0];
  }
}
