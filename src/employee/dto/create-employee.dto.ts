/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  salary: number;

  @IsNotEmpty()
  @IsNumber()
  companyId: number;
}
