/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Company } from '../../company/entities/company.entity';
import { Loan } from '../../loan/entities/loan.entity';

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

  @ManyToOne(() => Company, (company) => company.employees) // Definindo a relação ManyToOne com a entidade Company
  company: Company; // Aqui você deve ter uma propriedade chamada 'company' que referencia a entidade Company

  @ManyToOne(() => Company, (company) => company.employees)
  companyId: number;
  
  @OneToMany(() => Loan, (loan) => loan.employee)
  loans: Loan[];
}
