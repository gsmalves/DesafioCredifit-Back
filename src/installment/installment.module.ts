/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from '../loan/entities/loan.entity';
import { Installment } from './entities/installment.entity';
import { InstallmentController } from './installment.controller';
import { InstallmentService } from './installment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Installment, Loan])],
  providers: [InstallmentService],
  controllers: [InstallmentController],
  exports: [InstallmentService],
})
export class InstallmentModule {}
