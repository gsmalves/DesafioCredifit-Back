/* eslint-disable prettier/prettier */
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateCompanyDto {
    @IsOptional()
    @IsString()
    cnpj?: string;
  
    @IsOptional()
    @IsString()
    businessName?: string;
  
    @IsOptional()
    @IsString()
    fullName?: string;
  
    @IsOptional()
    @IsString()
    cpf?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @IsString()
    password?: string;
  }
