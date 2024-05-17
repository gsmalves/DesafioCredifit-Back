/* eslint-disable prettier/prettier */
import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateLoanDto {
  @IsInt()
  employeeId: number;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsInt()
  @IsPositive()
  installments: number;
}
