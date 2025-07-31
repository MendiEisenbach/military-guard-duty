import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Assignment } from '../assignments/assignment.entity';

@Entity()
export class Shift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startTime: string;

  @Column()
  endTime: string;

  @Column()
  location: string;

  @OneToMany(() => Assignment, (assignment) => assignment.shift)
  assignments: Assignment[];
}
