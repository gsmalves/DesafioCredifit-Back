/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { Loan } from './entities/loan.entity';
import { LoanService } from './loan.service';

@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  create(@Body() createLoanDto: CreateLoanDto): Promise<Loan> {
    const { employeeId, amount, installments } = createLoanDto;
    return this.loanService.createLoan(employeeId, amount, installments);
  }
}
