import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { ReportsService } from './reports.service';
import { ReportPeriodDto } from './dto/report-period.dto';

@ApiTags('reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get('balance')
  getBalance(@GetUser('id') userId: number, @Query() period: ReportPeriodDto) {
    return this.reportsService.getBalance(userId, period);
  }

  @Get('categories')
  @ApiQuery({ name: 'type', enum: ['INCOME', 'EXPENSE'], required: false })
  getCategoryReport(
    @GetUser('id') userId: number,
    @Query() period: ReportPeriodDto,
    @Query('type') type: 'INCOME' | 'EXPENSE' = 'EXPENSE',
  ) {
    return this.reportsService.getCategoryReport(userId, type, period);
  }

  @Get('timeline')
  @ApiQuery({ name: 'groupBy', enum: ['day', 'week', 'month'], required: false })
  getTimeline(
    @GetUser('id') userId: number,
    @Query() period: ReportPeriodDto,
    @Query('groupBy') groupBy: 'day' | 'week' | 'month' = 'month',
  ) {
    return this.reportsService.getTimeline(userId, groupBy, period);
  }

  @Get('top-expenses')
  @ApiQuery({ name: 'limit', required: false, type: Number })
  getTopExpenses(
    @GetUser('id') userId: number,
    @Query() period: ReportPeriodDto,
    @Query('limit') limit?: string,
  ) {
    return this.reportsService.getTopExpenses(userId, limit ? parseInt(limit) : 10, period);
  }

  @Get('detailed')
  getDetailedReport(@GetUser('id') userId: number, @Query() period: ReportPeriodDto) {
    return this.reportsService.getDetailedReport(userId, period);
  }
}
