/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Loan } from '../../loan/entities/loan.entity';

@Entity()
export class Installment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  loanId: number;

  @ManyToOne(() => Loan, loan => loan.installmentList)
  loan: Loan;

  @Column('decimal')
  amount: number;

  @Column('date')
  dueDate: Date;

  @Column('boolean', { default: false })
  paid: boolean;
}
