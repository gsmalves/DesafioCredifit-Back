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
  @ApiOperation({ summary: 'Cria um novo empréstimo' })
  @ApiResponse({ status: 201, description: 'O empréstimo foi criado com sucesso.', type: Loan })
  async createLoan(@Body() createLoanDto: CreateLoanDto): Promise<Loan> {
    const { employeeId, amount, installments } = createLoanDto;
    return this.loanService.createLoan(employeeId, amount, installments);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todos os empréstimos' })
  @ApiResponse({ status: 200, description: 'Lista com todos os empréstimos retornada com sucesso.', type: [Loan] })
  async getAllLoans(): Promise<Loan[]> {
    return this.loanService.getAllLoans();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém um empréstimo por ID' })
  @ApiResponse({ status: 200, description: 'Empréstimo encontrado com sucesso.', type: Loan })
  async getLoanById(@Param('id') id: number): Promise<Loan> {
    return this.loanService.getLoanById(id);
  }

  @Get(':employee/:employeeId')
  @ApiOperation({ summary: 'Obtém empréstimos associados a um funcionário' })
  @ApiResponse({ status: 200, description: 'Lista de empréstimos para o funcionário especificado retornados com sucesso.', type: [Loan] })
  async getLoansByEmployeeId(@Param('employeeId') employeeId: number): Promise<Loan[]> {
    return this.loanService.getLoansByEmployeeId(employeeId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um empréstimo pelo ID' })
  @ApiResponse({ status: 200, description: 'Empréstimo deletado com sucesso.' })
  async deleteLoan(@Param('id') id: number): Promise<void> {
    return this.loanService.deleteLoan(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um empréstimo pelo ID' })
  @ApiResponse({ status: 200, description: 'Atualização feita com sucesso.', type: Loan })
  async updateLoan(@Param('id') id: number, @Body() updateLoanDto: UpdateLoanDto): Promise<Loan> {
    return this.loanService.updateLoan(id, updateLoanDto);
  }
}
