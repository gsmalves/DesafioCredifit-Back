/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';
import { Installment } from '../../installment/entities/installment.entity';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeeId: number;

  @ManyToOne(() => Employee, employee => employee.loans)
  employee: Employee;

  @Column('decimal')
  amount: number;

  @Column('int')
  installments: number;

  @Column('decimal')
  installmentAmount: number;

  @Column('date')
  firstInstallmentDate: Date;

  @Column({ default: 'pending' })
  paymentStatus: string;


  @OneToMany(() => Installment, installment => installment.loan)
  installmentList: Installment[];
}
