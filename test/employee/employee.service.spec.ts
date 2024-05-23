/* eslint-disable prettier/prettier */
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeService } from '../../src/employee/employee.service';
import { Employee } from '../../src/employee/entities/employee.entity';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let repository: Repository<Employee>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: getRepositoryToken(Employee),
          useClass: Repository, // Mock
        },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
    repository = module.get<Repository<Employee>>(getRepositoryToken(Employee));
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um novo funcionário', async () => {
    const dadosFuncionario = {
      fullName: 'Gabriel Marins',
      cpf: '123.456.789-09',
      email: 'gab@gmail.com',
      password: 'password123',
      salary: 5000,
      companyId: 1,
    };

    const dadosFuncionarioCriado = {
      ...dadosFuncionario,
      id: 1,
    };

    const dadosParciaisFuncionario = { ...dadosFuncionarioCriado };
    delete dadosParciaisFuncionario.id;

    jest.spyOn(repository, 'save').mockResolvedValueOnce(dadosParciaisFuncionario as Employee);

    const resultado = await service.create(dadosFuncionario);
    expect(resultado).toEqual(dadosParciaisFuncionario);
  });

  it('deve buscar todos os funcionários', async () => {
    const funcionarios = [{ fullName: 'Funcionário 1' }, { fullName: 'Funcionário 2' }];
    jest.spyOn(repository, 'find').mockResolvedValueOnce(funcionarios as Employee[]);

    const resultado = await service.findAll();
    expect(resultado).toEqual(funcionarios);
  });

  it('deve buscar um funcionário por ID', async () => {
    const funcionario = { id: 1, fullName: 'Gabriel Marins' };
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(funcionario as Employee);

    const resultado = await service.findOneById(1);
    expect(resultado).toEqual(funcionario);
  });

  it('deve atualizar um funcionário', async () => {
    const dadosAtualizados = {
      id: 1,
      fullName: 'Gabriel Marins',
      cpf: '123.895.789-09',
      email: 'gab@gmail.com',
      password: 'password12345',
      salary: 7000,
    };

    const funcionario = { id: 1, fullName: 'Gabriel Marins' };
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(funcionario as Employee);
    jest.spyOn(repository, 'save').mockResolvedValueOnce(dadosAtualizados as Employee);

    const resultado = await service.update(1, dadosAtualizados);
    expect(resultado).toEqual(dadosAtualizados);
  });

  it('deve remover um funcionário', async () => {
    const funcionario = { id: 1, fullName: 'Gabriel Marins' };
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(funcionario as Employee);
    jest.spyOn(repository, 'remove').mockResolvedValueOnce(funcionario as Employee);

    await expect(service.remove(1)).resolves.not.toThrow();
  });

  it('deve lançar uma exceção ao tentar remover um funcionário inexistente', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

    await expect(service.remove(1)).rejects.toThrow(NotFoundException);
  });
});

