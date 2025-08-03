import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shift } from './shift.entity';

@Injectable()
export class ShiftsService {
  constructor(
    @InjectRepository(Shift)
    private readonly shiftRepo: Repository<Shift>,
  ) {}

  create(shift: Partial<Shift>) {
    const newShift = this.shiftRepo.create(shift);
    return this.shiftRepo.save(newShift);
  }

  findAll() {
    return this.shiftRepo.find();
  }

  async findOne(id: number) {
    const shift = await this.shiftRepo.findOne({ where: { id } });
    if (!shift) {
      throw new NotFoundException(`Shift with ID ${id} not found`);
    }
    return shift;
  }
}
