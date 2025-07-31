import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Assignment } from '../assignments/assignment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: 'soldier' | 'commander';

  @OneToMany(() => Assignment, (assignment) => assignment.user)
  assignments: Assignment[];
}
