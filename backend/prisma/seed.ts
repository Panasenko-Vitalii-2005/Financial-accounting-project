import { PrismaClient, TransactionType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      username: 'demo',
      passwordHash,
    },
  });

  const defaultCategories = [
    { name: 'Зарплата', type: TransactionType.INCOME },
    { name: 'Фріланс', type: TransactionType.INCOME },
    { name: 'Їжа', type: TransactionType.EXPENSE },
    { name: 'Транспорт', type: TransactionType.EXPENSE },
    { name: 'Розваги', type: TransactionType.EXPENSE },
    { name: 'Комунальні послуги', type: TransactionType.EXPENSE },
    { name: 'Зв\u2019язок', type: TransactionType.EXPENSE },
    { name: 'Здоров\u2019я', type: TransactionType.EXPENSE },
    { name: 'Одяг', type: TransactionType.EXPENSE },
  ];

  for (const cat of defaultCategories) {
    await prisma.category.upsert({
      where: { userId_name: { userId: user.id, name: cat.name } },
      update: {},
      create: { ...cat, userId: user.id },
    });
  }

  console.log('Seed complete');
}

main().catch(console.error).finally(() => prisma.$disconnect());
