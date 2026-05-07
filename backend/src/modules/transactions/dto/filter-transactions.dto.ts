import { IsOptional, IsDateString, IsInt, IsEnum, IsNumber, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { TransactionType } from '@prisma/client';

export class FilterTransactionsDto {
  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  dateFrom?: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  dateTo?: string;

  @ApiPropertyOptional()
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  categoryId?: number;

  @ApiPropertyOptional({ enum: TransactionType })
  @IsEnum(TransactionType)
  @IsOptional()
  type?: TransactionType;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  minAmount?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  maxAmount?: number;

  @ApiPropertyOptional({ enum: ['date', 'amount'] })
  @IsOptional()
  sortBy?: 'date' | 'amount';

  @ApiPropertyOptional({ enum: ['asc', 'desc'] })
  @IsOptional()
  sortOrder?: 'asc' | 'desc';
}
