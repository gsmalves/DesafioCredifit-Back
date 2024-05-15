/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  create(company: Company): Promise<Company> {
    return this.companyRepository.save(company);
  }

  findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  findOne(id: number): Promise<Company> {
    return this.companyRepository.findOneBy({ id });
  }
 //

}