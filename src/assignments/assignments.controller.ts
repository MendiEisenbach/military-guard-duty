import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('assignments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  @Roles('commander')
  assign(@Body() body: { userId: number; shiftId: number }) {
    return this.assignmentsService.assignUserToShift(body.userId, body.shiftId);
  }

  @Get('mine')
  @Roles('soldier')
  getMyAssignments(@Request() req) {
    return this.assignmentsService.getAssignmentsForUser(req.user.userId);
  }

  @Get()
  @Roles('commander')
  getAll() {
    return this.assignmentsService.getAllAssignments();
  }
}
