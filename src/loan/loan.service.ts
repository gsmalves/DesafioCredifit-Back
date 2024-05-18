/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { Employee } from '../employee/entities/employee.entity';
import { Installment } from '../installment/entities/installment.entity';
import { Loan } from './entities/loan.entity';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Installment)
    private readonly installmentRepository: Repository<Installment>,
  ) {}

  async createLoan(employeeId: number, amount: number, installments: number): Promise<Loan> {
    const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });
    if (!employee) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }
  
    // Calcula a margem disponível para consignado (35% do salário)
    const consignableMargin = employee.salary * 0.35;
  
    // Verifica se o valor do empréstimo solicitado excede a margem disponível
    const requestedAmount = amount * installments; // Total do valor do empréstimo
    if (requestedAmount > consignableMargin) {
      throw new HttpException('Requested loan amount exceeds consignable margin', HttpStatus.BAD_REQUEST);
    }
    const scoreResponse = await axios.get(`https://run.mocky.io/v3/dd92b9c2-d375-4a85-9e46-207c404b0bb4/${employee.cpf}`);
    const score = scoreResponse.data.score;

    let minScore;
    if (employee.salary <= 2000) {
      minScore = 400;
    } else if (employee.salary <= 4000) {
      minScore = 500;
    } else if (employee.salary <= 8000) {
      minScore = 600;
    } else if (employee.salary <= 12000) {
      minScore = 700;
    } else {
      throw new HttpException('Salary out of range', HttpStatus.BAD_REQUEST);
    }

    if (score < minScore) {
      throw new HttpException('Insufficient credit score', HttpStatus.BAD_REQUEST);
    }

    const loan = new Loan();
    loan.employee = employee;
    loan.employeeId = employee.id;
    loan.amount = amount;
    loan.installments = installments;
    loan.installmentAmount = amount / installments;
    loan.firstInstallmentDate = new Date();
    loan.firstInstallmentDate.setMonth(loan.firstInstallmentDate.getMonth() + 1);

    const savedLoan = await this.loanRepository.save(loan);

    // Criar as parcelas
    for (let i = 0; i < installments; i++) {
      const installment = new Installment();
      installment.loan = savedLoan;
      installment.loanId = savedLoan.id;
      installment.amount = loan.installmentAmount;
      installment.dueDate = new Date(loan.firstInstallmentDate);
      installment.dueDate.setMonth(installment.dueDate.getMonth() + i);
      await this.installmentRepository.save(installment);
    }

    // Chamar o mock de gateway de pagamentos
    try {
      const paymentResponse = await axios.post('https://run.mocky.io/v3/ed999ce0-d115-4f73-b098-6277aabbd144', {
        loanId: savedLoan.id,
        amount: loan.amount,
        account: employee.email, // Supondo que o email é usado para a conta bancária
      });

      if (paymentResponse.data.success) {
        savedLoan.paymentStatus = 'paid';
      } else {
        savedLoan.paymentStatus = 'failed';
      }
    } catch (error) {
      savedLoan.paymentStatus = 'failed';
    }

    return this.loanRepository.save(savedLoan);
  }


}
