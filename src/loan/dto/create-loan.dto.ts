/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateLoanDto {
  @ApiProperty({ description: 'ID of the employee who is requesting the loan' })
  @IsInt({ message: 'Employee ID must be an integer' })
  employeeId: number;

  @ApiProperty({ description: 'Amount of money requested for the loan' })
  @IsNumber({}, { message: 'Loan amount must be a number' })
  @IsPositive({ message: 'Loan amount must be positive' })
  amount: number;

  @ApiProperty({ description: 'Number of installments for the loan' })
  @IsInt({ message: 'Number of installments must be an integer' })
  @IsPositive({ message: 'Number of installments must be positive' })
  installments: number;
}
