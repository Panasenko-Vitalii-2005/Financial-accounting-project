import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { TransactionType } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findFirst({
      where: { OR: [{ email: dto.email }, { username: dto.username }] },
    });
    if (existing) {
      throw new ConflictException('Email or username already taken');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: { email: dto.email, username: dto.username, passwordHash },
    });

    await this.createDefaultCategories(user.id);

    const token = this.signToken(user.id, user.email);
    return { access_token: token, user: { id: user.id, email: user.email, username: user.username } };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.emailOrUsername }, { username: dto.emailOrUsername }],
      },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const token = this.signToken(user.id, user.email);
    return { access_token: token, user: { id: user.id, email: user.email, username: user.username } };
  }

  private signToken(userId: number, email: string): string {
    return this.jwt.sign({ sub: userId, email });
  }

  private async createDefaultCategories(userId: number) {
    const defaults = [
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

    await this.prisma.category.createMany({
      data: defaults.map((c) => ({ ...c, userId })),
    });
  }
}
