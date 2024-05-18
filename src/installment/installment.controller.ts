/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { Installment } from './entities/installment.entity';
import { InstallmentService } from './installment.service';

@Controller('installments')
export class InstallmentController {
  constructor(private readonly installmentService: InstallmentService) {}

  @Get()
  findAll(): Promise<Installment[]> {
    return this.installmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Installment> {
    return this.installmentService.findOne(id);
  }

  @Patch(':id/pay')
  markAsPaid(@Param('id') id: number): Promise<Installment> {
    return this.installmentService.markAsPaid(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.installmentService.remove(id);
  }
}
