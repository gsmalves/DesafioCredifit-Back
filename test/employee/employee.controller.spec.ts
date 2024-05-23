/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CreateEmployeeDto } from '../../src/employee/dto/create-employee.dto';
import { UpdateEmployeeDto } from '../../src/employee/dto/update-employee.dto';
import { EmployeeController } from '../../src/employee/employee.controller';
import { EmployeeService } from '../../src/employee/employee.service';
import { Employee } from '../../src/employee/entities/employee.entity';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [EmployeeService],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    employeeService = module.get<EmployeeService>(EmployeeService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });
  
  it('deve criar um novo funcionário', async () => {
    const createEmployeeDto: CreateEmployeeDto = {
      fullName: 'Helena Pádua',
      cpf: '123.456.789-09',
      email: 'helena@gmail.com',
      password: 'password123',
      salary: 5000,
      companyId: 1,
    };

    const employeeData: Employee = {
      id: 1,
      fullName: createEmployeeDto.fullName,
      cpf: createEmployeeDto.cpf,
      email: createEmployeeDto.email, // Garantindo que email seja definido
      ...createEmployeeDto,
      company: undefined,
      loans: undefined,
    };

    jest.spyOn(employeeService, 'create').mockResolvedValueOnce(employeeData);

    const result = await controller.create(createEmployeeDto);
    expect(result).toEqual(employeeData);
  });

  it('deve obter todos os funcionários', async () => {
    const employeeData: Employee[] = []; 
  
    jest.spyOn(employeeService, 'findAll').mockResolvedValueOnce(employeeData);
  
    const result = await controller.findAll();
    expect(result).toEqual(employeeData);
  });

  it('deve obter um funcionário pelo ID', async () => {
    const employeeData: Employee = {
      id: 1,
      fullName: 'Helena Pádua',
      cpf: '123.456.789-09',
      email: 'john@example.com',
      password: 'password123',
      salary: 5000,
      companyId: 1,
      company: undefined,
      loans: undefined,
    };

    jest.spyOn(employeeService, 'findOneById').mockResolvedValueOnce(employeeData);

    const result = await controller.findOne('1');
    expect(result).toEqual(employeeData);
  });

  

it('deve atualizar um funcionário', async () => {
  const updateEmployeeDto: UpdateEmployeeDto = {
    fullName: 'Helena Pádua Updated',
    cpf: '123.456.789-09',
    email: 'hp@gmail.com',
    password: 'password12345',
    salary: 9000,
    companyId: 2,
  };

  const employeeData: Employee = {
    id: 1,
    fullName: updateEmployeeDto.fullName,
    cpf: updateEmployeeDto.cpf,
    email: updateEmployeeDto.email,
    password: updateEmployeeDto.password, 
    salary: updateEmployeeDto.salary, 
    companyId: updateEmployeeDto.companyId,
    company: undefined,
    loans: undefined,
  };

  jest.spyOn(employeeService, 'update').mockResolvedValueOnce(employeeData);

  const result = await controller.update('1', updateEmployeeDto);
  expect(result).toEqual(employeeData);
});

  it('deve remover um funcionário', async () => {
    jest.spyOn(employeeService, 'remove').mockResolvedValueOnce();

    const result = await controller.remove('1');
    expect(result).toBeUndefined();
  });
});
