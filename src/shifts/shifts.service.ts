import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return this.shiftRepo.findOne({ where: { id } });
  }
}
