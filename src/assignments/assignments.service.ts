import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignment } from './assignment.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Shift } from '../shifts/shift.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepo: Repository<Assignment>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Shift)
    private readonly shiftRepo: Repository<Shift>,
  ) {}

  async assignUserToShift(userId: number, shiftId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const shift = await this.shiftRepo.findOne({ where: { id: shiftId } });
    if (!shift) {
      throw new NotFoundException(`Shift with ID ${shiftId} not found`);
    }

    const assignment = this.assignmentRepo.create({ user, shift });
    return this.assignmentRepo.save(assignment);
  }

  async getAssignmentsForUser(userId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.assignmentRepo.find({
      where: { user: { id: userId } },
      relations: ['shift'],
    });
  }

  async getAllAssignments() {
    return this.assignmentRepo.find({ relations: ['user', 'shift'] });
  }
}
