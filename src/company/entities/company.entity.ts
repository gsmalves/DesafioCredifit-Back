/* eslint-disable prettier/prettier */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../../employee/entities/employee.entity';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    cnpj: string;
  
    @Column()
    businessName: string;
  
    @Column()
    fullName: string;
  
    @Column({ unique: true })
    cpf: string;

    @Column({ unique: true })
    email: string;
  
    @Column()
    password: string;
  
    @OneToMany(() => Employee, (employee) => employee.company)
    employees: Employee[];

}