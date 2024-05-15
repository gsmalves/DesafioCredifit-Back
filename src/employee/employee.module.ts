/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from '../company/company.module'; // Importe o módulo que contém o CompanyRepository
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    CompanyModule, // Importe o módulo que contém o CompanyRepository
  ],
  providers: [EmployeeService],
  controllers: [EmployeeController],
  exports: [EmployeeService],
})
export class EmployeeModule {}

