/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ description: 'Nome completo do funcionário', example: 'João da Silva' })
  @IsNotEmpty({ message: 'O nome completo não pode estar vazio' })
  @IsString({ message: 'O nome completo deve ser uma string' })
  fullName: string;

  @ApiProperty({ description: 'CPF do funcionário', example: '123.456.789-00' })
  @IsNotEmpty({ message: 'O CPF não pode estar vazio' })
  @IsString({ message: 'O CPF deve ser uma string' })
  cpf: string;

  @ApiProperty({ description: 'Endereço de e-mail do funcionário', example: 'joao.silva@example.com' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
  @IsEmail({}, { message: 'O e-mail deve ser um endereço de e-mail válido' })
  email: string;

  @ApiProperty({ description: 'Senha para acesso do funcionário ao sistema', example: 'senhasegura123' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @IsString({ message: 'A senha deve ser uma string' })
  password: string;

  @ApiProperty({ description: 'Salário do funcionário', example: 2500 })
  @IsNotEmpty({ message: 'O salário não pode estar vazio' })
  @IsNumber({}, { message: 'O salário deve ser um número' })
  @IsPositive({ message: 'O salário deve ser um valor positivo' })
  salary: number;

  @ApiProperty({ description: 'ID da empresa à qual o funcionário está associado', example: 1 })
  @IsNotEmpty({ message: 'O ID da empresa não pode estar vazio' })
  @IsNumber({}, { message: 'O ID da empresa deve ser um número' })
  @IsPositive({ message: 'O ID da empresa deve ser um valor positivo' })
  companyId: number;
}
