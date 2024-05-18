/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../employee/entities/employee.entity';

import { LoanService } from '../loan/loan.service';
import { Loan } from './entities/loan.entity';
import { LoanController } from './loan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Loan, Employee])],
  providers: [LoanService],
  controllers: [LoanController],
})
export class LoanModule {}
