import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { Assignment } from './assignment.entity';
import { User } from '../users/user.entity';
import { Shift } from '../shifts/shift.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment, User, Shift])],
  providers: [AssignmentsService],
  controllers: [AssignmentsController],
})
export class AssignmentsModule {}
