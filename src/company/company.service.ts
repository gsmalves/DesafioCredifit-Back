/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const { cnpj, businessName, fullName, cpf, email, password } = createCompanyDto;
    const company = new Company();
    company.cnpj = cnpj;
    company.businessName = businessName;
    company.fullName = fullName;
    company.cpf = cpf;
    company.email = email;
    company.password = password;
    return await this.companyRepository.save(company);
  }

  async findAll(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companyRepository.findOneBy({id});
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    return company;
  }

  async update(id: number, updateCompanyDto: CreateCompanyDto): Promise<Company> {
    const { cnpj, businessName, fullName, cpf, email, password } = updateCompanyDto;
    const company = await this.companyRepository.findOneBy({id});
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    company.cnpj = cnpj;
    company.businessName = businessName;
    company.fullName = fullName;
    company.cpf = cpf;
    company.email = email;
    company.password = password;
    return await this.companyRepository.save(company);
  }

  async remove(id: number): Promise<void> {
    const company = await this.findOne(id);
    await this.companyRepository.remove(company);
  }
}