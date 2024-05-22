/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { Employee } from '../employee/entities/employee.entity';
import { Loan } from './entities/loan.entity';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async createLoan(employeeId: number, amount: number, installments: number): Promise<Loan> {
    const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });
    if (!employee) {
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }
  
    const loan = new Loan();
    loan.employee = employee;
    loan.employeeId = employee.id;
    loan.amount = amount;
    loan.installments = installments;
    loan.installmentAmount = amount / installments;
    loan.firstInstallmentDate = new Date();
    loan.firstInstallmentDate.setMonth(loan.firstInstallmentDate.getMonth() + 1);

    const consignableMargin = employee.salary * 0.35;
    const monthlyInstallmentAmount = amount / installments;
    
    if (monthlyInstallmentAmount > consignableMargin) {
      loan.paymentStatus = 'failed';
      loan.failureReason = 'Margem';
      return this.loanRepository.save(loan);
    }
  
    const scoreResponse = await axios.get(`https://run.mocky.io/v3/ef99c032-8e04-4e6a-ad3e-6f413a9e707a/${employee.cpf}`);
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
      loan.paymentStatus = 'failed';
      loan.failureReason = 'Faixa salarial';
      return this.loanRepository.save(loan);
    }

    if (score < minScore) {
      loan.paymentStatus = 'failed';
      loan.failureReason = 'Score';
      return this.loanRepository.save(loan);
    }

    const installmentsList = [];
    for (let i = 0; i < installments; i++) {
      const dueDate = new Date(loan.firstInstallmentDate);
      dueDate.setMonth(dueDate.getMonth() + i);
      installmentsList.push({ amount: loan.installmentAmount, dueDate, paymentStatus: 'pending' });
    }
    loan.installmentsList = installmentsList;

    const savedLoan = await this.loanRepository.save(loan);

    try {
      const paymentResponse = await axios.post('https://run.mocky.io/v3/ed999ce0-d115-4f73-b098-6277aabbd144', {
        loanId: savedLoan.id,
        amount: loan.amount,
      });

      if (paymentResponse.data.ok) {
        savedLoan.paymentStatus = 'paid';
        savedLoan.installmentsList.forEach(installment => installment.paymentStatus = 'paid');
      } else {
        savedLoan.paymentStatus = 'failed';
        savedLoan.failureReason = 'Pagamento falhou';
        savedLoan.installmentsList.forEach(installment => installment.paymentStatus = 'failed');
      }
    } catch (error) {
      savedLoan.paymentStatus = 'failed';
      savedLoan.failureReason = 'Erro ao processar pagamento';
      savedLoan.installmentsList.forEach(installment => installment.paymentStatus = 'failed');
    }

    return this.loanRepository.save(savedLoan);
  }

  async getAllLoans(): Promise<Loan[]> {
    return this.loanRepository.find({ relations: ['employee'] });
  }

  async getLoanById(id: number): Promise<Loan> {
    const loan = await this.loanRepository.findOne({ where: { id }, relations: ['employee'] });
    if (!loan) {
      throw new HttpException('Loan not found', HttpStatus.NOT_FOUND);
    }
    return loan;
  }

  async getLoansByEmployeeId(employeeId: number): Promise<Loan[]> {
    const loans = await this.loanRepository.find({ where: { employeeId }, relations: ['employee'] });
    return loans;
  }

  async deleteLoan(id: number): Promise<void> {
    const loan = await this.loanRepository.findOne({ where: { id } });
    if (!loan) {
      throw new HttpException('Loan not found', HttpStatus.NOT_FOUND);
    }
    await this.loanRepository.remove(loan);
  }

  async updateLoan(id: number, updateLoanDto: Partial<Loan>): Promise<Loan> {
    const loan = await this.loanRepository.findOne({ where: { id } });
    if (!loan) {
      throw new HttpException('Loan not found', HttpStatus.NOT_FOUND);
    }
    const updatedLoan = Object.assign(loan, updateLoanDto);
    return this.loanRepository.save(updatedLoan);
  }
}
