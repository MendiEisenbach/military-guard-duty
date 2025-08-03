import { Controller, Post, Body, Get, Request, UseGuards, BadRequestException, NotFoundException } from '@nestjs/common';
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
  async assign(@Body() body: { userId: number; shiftId: number }) {
    if (!body.userId || !body.shiftId) {
      throw new BadRequestException('userId and shiftId are required');
    }
    try {
      return await this.assignmentsService.assignUserToShift(body.userId, body.shiftId);
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get('mine')
  @Roles('soldier')
  async getMyAssignments(@Request() req) {
    const assignments = await this.assignmentsService.getAssignmentsForUser(req.user.userId);
    if (!assignments || assignments.length === 0) {
      throw new NotFoundException('No assignments found for the current user');
    }
    return assignments;
  }

  @Get()
  @Roles('commander')
  async getAll() {
    const allAssignments = await this.assignmentsService.getAllAssignments();
    if (!allAssignments || allAssignments.length === 0) {
      throw new NotFoundException('No assignments found');
    }
    return allAssignments;
  }
}
