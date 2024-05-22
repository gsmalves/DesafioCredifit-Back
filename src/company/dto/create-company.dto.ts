/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ description: 'CNPJ da empresa', example: '12.345.678/0001-90' })
  @IsNotEmpty({ message: 'CNPJ não pode estar vazio' })
  @IsString({ message: 'CNPJ deve ser uma string' })
  cnpj: string;

  @ApiProperty({ description: 'Nome comercial da empresa', example: 'Empresa XYZ' })
  @IsNotEmpty({ message: 'Nome comercial não pode estar vazio' })
  @IsString({ message: 'Nome comercial deve ser uma string' })
  businessName: string;

  @ApiProperty({ description: 'Nome completo do responsável pela empresa', example: 'Maria da Silva' })
  @IsNotEmpty({ message: 'Nome completo não pode estar vazio' })
  @IsString({ message: 'Nome completo deve ser uma string' })
  fullName: string;

  @ApiProperty({ description: 'CPF do responsável pela empresa', example: '123.456.789-00' })
  @IsNotEmpty({ message: 'CPF não pode estar vazio' })
  @IsString({ message: 'CPF deve ser uma string' })
  cpf: string;

  @ApiProperty({ description: 'Endereço de e-mail do responsável pela empresa', example: 'maria.silva@example.com' })
  @IsNotEmpty({ message: 'E-mail não pode estar vazio' })
  @IsEmail({}, { message: 'E-mail deve ser um endereço de e-mail válido' })
  email: string;

  @ApiProperty({ description: 'Senha para acesso ao sistema', example: 'securepassword123' })
  @IsNotEmpty({ message: 'Senha não pode estar vazia' })
  @IsString({ message: 'Senha deve ser uma string' })
  password: string;
}
