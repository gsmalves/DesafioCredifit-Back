/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateCompanyDto {
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    cnpj: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    businessName: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    fullName: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    cpf: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsEmail()
    email: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    password: string;
}
