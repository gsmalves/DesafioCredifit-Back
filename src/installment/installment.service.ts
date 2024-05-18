/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loan } from '../loan/entities/loan.entity';
import { Installment } from './entities/installment.entity';

@Injectable()
export class InstallmentService {
  constructor(
    @InjectRepository(Installment)
    private readonly installmentRepository: Repository<Installment>,
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
  ) {}

  async findAll(): Promise<Installment[]> {
    return this.installmentRepository.find({ relations: ['loan'] });
  }

  async findOne(id: number): Promise<Installment> {
    const installment = await this.installmentRepository.findOne({ where: { id }, relations: ['loan'] });
    if (!installment) {
      throw new HttpException('Installment not found', HttpStatus.NOT_FOUND);
    }
    return installment;
  }

  async markAsPaid(id: number): Promise<Installment> {
    const installment = await this.findOne(id);
    installment.paid = true;
    return this.installmentRepository.save(installment);
  }

  async remove(id: number): Promise<void> {
    const installment = await this.findOne(id);
    await this.installmentRepository.remove(installment);
  }
}
