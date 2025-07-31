import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Shift } from '../shifts/shift.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.assignments, { eager: true })
  user: User;

  @ManyToOne(() => Shift, (shift) => shift.assignments, { eager: true })
  shift: Shift;
}
