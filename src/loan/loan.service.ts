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
  
    // Calcula a margem disponível para consignado (35% do salário)
    const consignableMargin = employee.salary * 0.35;
  
    // Verifica se o valor da parcela do empréstimo solicitado excede a margem disponível
    const monthlyInstallmentAmount = amount / installments;
    if (monthlyInstallmentAmount > consignableMargin) {
      throw new HttpException('Requested loan amount exceeds consignable margin', HttpStatus.BAD_REQUEST);
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
    loan.employee = employee;
    loan.employeeId = employee.id;
    loan.amount = amount;
    loan.installments = installments;
    loan.installmentAmount = monthlyInstallmentAmount;
    loan.firstInstallmentDate = new Date();
    loan.firstInstallmentDate.setMonth(loan.firstInstallmentDate.getMonth() + 1);

    const installmentsList = [];
    for (let i = 0; i < installments; i++) {
      const dueDate = new Date(loan.firstInstallmentDate);
      dueDate.setMonth(dueDate.getMonth() + i);
      installmentsList.push({ amount: loan.installmentAmount, dueDate, paymentStatus: 'pending' });
    }
    loan.installmentsList = installmentsList;

    const savedLoan = await this.loanRepository.save(loan);

    // Chamar o mock de gateway de pagamentos
    try {
      const paymentResponse = await axios.post('https://run.mocky.io/v3/ed999ce0-d115-4f73-b098-6277aabbd144', {
        loanId: savedLoan.id,
        amount: loan.amount,

      });

      if (paymentResponse.data.ok) {
        savedLoan.paymentStatus = 'paid';
        // Atualizar o status das parcelas para "paid"
        savedLoan.installmentsList.forEach(installment => installment.paymentStatus = 'paid');
      } else {
        savedLoan.paymentStatus = 'failed';
        // Atualizar o status das parcelas para "failed"
        savedLoan.installmentsList.forEach(installment => installment.paymentStatus = 'failed');
      }
    } catch (error) {
      savedLoan.paymentStatus = 'failed';
      // Atualizar o status das parcelas para "failed"
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
    // Busca todos os empréstimos associados ao funcionário com o ID fornecido
    const loans = await this.loanRepository.find({ where: { employeeId }, relations: ['employee'] });
    return loans;
  

  }

  async createLoanTest(employeeId: number, amount: number, installments: number): Promise<Loan> {
  // Supondo que você tenha obtido o empregado diretamente por meio do ID, sem realizar validações extras
  const employee = await this.employeeRepository.findOne({ where: { id: employeeId } });

  // Criar um novo empréstimo
  const loan = new Loan();
  loan.employee = employee;
  loan.amount = amount;
  loan.installments = installments;
  loan.installmentAmount = amount / installments;
  loan.firstInstallmentDate = new Date();
  loan.firstInstallmentDate.setMonth(loan.firstInstallmentDate.getMonth() + 1);

  // Criar uma lista de parcelas pendentes
  const installmentsList = [];
  for (let i = 0; i < installments; i++) {
    const dueDate = new Date(loan.firstInstallmentDate);
    dueDate.setMonth(dueDate.getMonth() + i);
    installmentsList.push({ amount: loan.installmentAmount, dueDate, paymentStatus: 'pending' });
  }
  loan.installmentsList = installmentsList;

  // Salvar o empréstimo no banco de dados
  return this.loanRepository.save(loan);
}

}
