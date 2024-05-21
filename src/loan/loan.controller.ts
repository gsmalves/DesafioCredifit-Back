/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Loan } from './entities/loan.entity';
import { LoanService } from './loan.service';

@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  async createLoan(@Body() createLoanDto: { employeeId: number; amount: number; installments: number }): Promise<Loan> {
    const { employeeId, amount, installments } = createLoanDto;
    return this.loanService.createLoan(employeeId, amount, installments);
  }

  @Get()
  async getAllLoans(): Promise<Loan[]> {
    return this.loanService.getAllLoans();
  }

  @Get(':id')
  async getLoanById(@Param('id') id: number): Promise<Loan> {
    return this.loanService.getLoanById(id);
  }

  @Get(':employeeId')
  async getLoansByEmployeeId(@Param('employeeId') employeeId: number): Promise<Loan[]> {
    return this.loanService.getLoansByEmployeeId(employeeId);
  }

  @Post('test')
  async createLoanTest(@Body() createLoanDto: { employeeId: number; amount: number; installments: number }): Promise<Loan> {
    const { employeeId, amount, installments } = createLoanDto;
    return this.loanService.createLoanTest(employeeId, amount, installments);
  }

}
