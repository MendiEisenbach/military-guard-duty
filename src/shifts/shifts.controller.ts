import { Controller, Post, Get, Body, UseGuards, BadRequestException, NotFoundException } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { Shift } from './shift.entity';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('shifts')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Post()
  @Roles('commander')
  async create(@Body() shift: Partial<Shift>) {
    if (!shift.startTime || !shift.endTime || !shift.location) {
      throw new BadRequestException('Missing required fields: startTime, endTime, and location are all required.');
    }
    return this.shiftsService.create(shift);
  }

  @Get()
  @Roles('commander', 'soldier')
  async findAll() {
    const shifts = await this.shiftsService.findAll();
    if (!shifts || shifts.length === 0) {
      throw new NotFoundException('No shifts found');
    }
    return shifts;
  }
}
