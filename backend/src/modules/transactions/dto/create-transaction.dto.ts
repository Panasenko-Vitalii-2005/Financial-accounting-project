import { IsNumber, IsDateString, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateTransactionDto {
  @ApiProperty({ example: 1500.00 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  @Type(() => Number)
  amount: number;

  @ApiProperty({ example: '2024-01-15' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Type(() => Number)
  categoryId: number;

  @ApiPropertyOptional({ example: 'Monthly salary' })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  description?: string;
}
