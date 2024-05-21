/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const { fullName, cpf, email, password, salary, companyId } = createEmployeeDto;

    const employee = new Employee();
    employee.fullName = fullName;
    employee.cpf = cpf;
    employee.email = email;
    employee.password = password;
    employee.salary = salary;
    employee.companyId = companyId;

    return await this.employeeRepository.save(employee);
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find({ relations: ['companyId'] });
  }

  async findOneById(id: number): Promise<Employee> {
    return this.employeeRepository.findOne({ 
      where: { id },
      relations: ['companyId']
    });
  }
  

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({id});
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    const { fullName, cpf, email, password, salary } = updateEmployeeDto;

    // Update only the provided fields
    if (fullName !== undefined) {
      employee.fullName = fullName;
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

    // Salvar as atualizações
    return await this.employeeRepository.save(employee);
  }

  async remove(id: number): Promise<void> {
    const employee = await this.employeeRepository.findOneBy({id});
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    await this.employeeRepository.remove(employee);
  }
}
