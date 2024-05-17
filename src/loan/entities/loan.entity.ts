/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, employee => employee.loans)
  employee: Employee;

  @Column()
  employeeId: number;

  @Column('decimal')
  amount: number;

  @Column('int')
  installments: number;

  @Column('decimal')
  installmentAmount: number;

  @Column('date')
  firstInstallmentDate: Date;
}
