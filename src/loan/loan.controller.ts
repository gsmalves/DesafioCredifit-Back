/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { Loan } from './entities/loan.entity';
import { LoanService } from './loan.service';

@ApiTags('loans')
@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new loan' })
  @ApiResponse({ status: 201, description: 'The loan has been successfully created.', type: Loan })
  async createLoan(@Body() createLoanDto: CreateLoanDto): Promise<Loan> {
    const { employeeId, amount, installments } = createLoanDto;
    return this.loanService.createLoan(employeeId, amount, installments);
  }

  @Get()
  @ApiOperation({ summary: 'Get all loans' })
  @ApiResponse({ status: 200, description: 'List of all loans returned successfully.', type: [Loan] })
  async getAllLoans(): Promise<Loan[]> {
    return this.loanService.getAllLoans();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a loan by ID' })
  @ApiResponse({ status: 200, description: 'Loan found successfully.', type: Loan })
  async getLoanById(@Param('id') id: number): Promise<Loan> {
    return this.loanService.getLoanById(id);
  }

  @Get(':employee/:employeeId')
  @ApiOperation({ summary: 'Get loans by employee ID' })
  @ApiResponse({ status: 200, description: 'List of loans for the specified employee returned successfully.', type: [Loan] })
  async getLoansByEmployeeId(@Param('employeeId') employeeId: number): Promise<Loan[]> {
    return this.loanService.getLoansByEmployeeId(employeeId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a loan by ID' })
  @ApiResponse({ status: 200, description: 'Loan deleted successfully.' })
  async deleteLoan(@Param('id') id: number): Promise<void> {
    return this.loanService.deleteLoan(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a loan by ID' })
  @ApiResponse({ status: 200, description: 'Loan updated successfully.', type: Loan })
  async updateLoan(@Param('id') id: number, @Body() updateLoanDto: UpdateLoanDto): Promise<Loan> {
    return this.loanService.updateLoan(id, updateLoanDto);
  }
}
