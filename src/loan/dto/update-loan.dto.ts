/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive } from 'class-validator';
import { CreateLoanDto } from './create-loan.dto';

export class UpdateLoanDto extends PartialType(CreateLoanDto) {
  @ApiProperty({ required: false })
  @IsInt()
  employeeId?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsPositive()
  amount?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsPositive()
  installments?: number;
}
