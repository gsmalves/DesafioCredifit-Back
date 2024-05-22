/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateLoanDto {
  @ApiProperty({ description: 'ID do funcionário que está solicitando o empréstimo' })
  @IsInt({ message: 'O ID do funcionário deve ser um número inteiro' })
  employeeId: number;

  @ApiProperty({ description: 'Valor do dinheiro solicitado para o empréstimo' })
  @IsNumber({}, { message: 'O valor do empréstimo deve ser um número' })
  @IsPositive({ message: 'O valor do empréstimo deve ser positivo' })
  amount: number;

  @ApiProperty({ description: 'Número de parcelas para o empréstimo' })
  @IsInt({ message: 'O número de parcelas deve ser um número inteiro' })
  @IsPositive({ message: 'O número de parcelas deve ser positivo' })
  installments: number;
}
