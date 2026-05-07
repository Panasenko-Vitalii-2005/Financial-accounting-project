import { IsDateString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ReportPeriodDto {
  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  dateFrom?: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  dateTo?: string;
}
