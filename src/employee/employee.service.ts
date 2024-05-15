/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../company/entities/company.entity'; // Importar a entidade Company
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Company) // Injetar o repositório da entidade Company
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const { name, cpf, email, password, salary, companyId } = createEmployeeDto;

    // Verificar se a empresa existe
    const company = await this.companyRepository.findOne({ where: { id: companyId } });
    if (!company) {
      throw new NotFoundException('Company not found');
    }

    // Criar o funcionário associado à empresa
    const employee = new Employee();
    employee.fullName = name;
    employee.cpf = cpf;
    employee.email = email;
    employee.password = password;
    employee.salary = salary;
    employee.companyId = company.id; // Associar o funcionário à empresa
    return await this.employeeRepository.save(employee);
  }


  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find();
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const { name, cpf, email, password, salary } = updateEmployeeDto;

    // Update only the provided fields
    if (name !== undefined) {
      employee.fullName = name;
    }
    if (cpf !== undefined) {
      employee.cpf = cpf;
    }
    if (email !== undefined) {
      employee.email = email;
    }
    if (password !== undefined) {
      employee.password = password;
    }
    if (salary !== undefined) {
      employee.salary = salary;
    }
    return await this.employeeRepository.save(employee);
  }

  async remove(id: number): Promise<void> {
    const employee = await this.findOne(id);
    await this.employeeRepository.remove(employee);
  }
}
