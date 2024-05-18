/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
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
}
