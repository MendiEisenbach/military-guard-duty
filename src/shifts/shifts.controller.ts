import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
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
  create(@Body() shift: Partial<Shift>) {
    return this.shiftsService.create(shift);
  }

  @Get()
  @Roles('commander', 'soldier')
  findAll() {
    return this.shiftsService.findAll();
  }
}
