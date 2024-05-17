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
      throw new HttpException('Salary out of range', HttpStatus.BAD_REQUEST);
    }

    if (score < minScore) {
      throw new HttpException('Insufficient credit score', HttpStatus.BAD_REQUEST);
    }

    const loan = new Loan();
    loan.employeeId = employee.id;
    loan.amount = amount;
    loan.installments = installments;
    loan.installmentAmount = amount / installments;
    loan.firstInstallmentDate = new Date();
    loan.firstInstallmentDate.setMonth(loan.firstInstallmentDate.getMonth() + 1);

    return this.loanRepository.save(loan);
  }
}
