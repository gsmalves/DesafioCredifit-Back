/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';


@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, (employee) => employee.loans)
  employee: Employee;

  @Column()
  employeeId: number;

  @Column('decimal')
  amount: number;

  @Column()
  installments: number;

  @Column('decimal')
  installmentAmount: number;

  @Column('date')
  firstInstallmentDate: Date;

  @Column({ nullable: true })
  paymentStatus: string;
  
  @Column('jsonb', { default: [] })
  installmentsList: { amount: number; dueDate: Date; paymentStatus?: string }[];

  @Column({ nullable: true })
  failureReason: string;
}

// enum FailureReason {
//   SCORE = 'score',
//   MARGIN = 'margin',
// }
