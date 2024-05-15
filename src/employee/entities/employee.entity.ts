/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column('decimal')
  salary: number;

  @ManyToOne(() => Company, (company) => company.employees)
  company: Company;
}
