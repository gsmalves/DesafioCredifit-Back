/* eslint-disable prettier/prettier */
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CompanyService } from '../../src/company/company.service';
import { CreateCompanyDto } from '../../src/company/dto/create-company.dto';
import { Company } from '../../src/company/entities/company.entity';

describe('CompanyService', () => {
  let service: CompanyService;
  let companyRepositoryMock: any;

  beforeEach(async () => {
    companyRepositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(Company),
          useValue: companyRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar uma nova empresa', async () => {
    const createCompanyDto: CreateCompanyDto = {
      cnpj: '12.345.678/0002-00',
      businessName: 'Empresa XYZ',
      fullName: 'Esidro da Silva',
      cpf: '98765432109',
      email: 'Esidro@example.com',
      password: 'senha123',
    };

    const companyMock = {
      id: 1,
      ...createCompanyDto,
    };

    companyRepositoryMock.save.mockResolvedValueOnce(companyMock);

    const result = await service.create(createCompanyDto);
    expect(result).toEqual(companyMock);
    expect(companyRepositoryMock.save).toHaveBeenCalledWith(createCompanyDto);
  });

  it('deve obter todas as empresas', async () => {
    const companyMock = []; 
  
    companyRepositoryMock.find.mockResolvedValueOnce(companyMock);
  
    const result = await service.findAll();
    expect(result).toEqual(companyMock);
    expect(companyRepositoryMock.find).toHaveBeenCalled();
  });
  it('deve obter uma empresa pelo ID', async () => {
    const companyId = 1;
    const companyMock = {
      id: companyId,
      cnpj: ' 12.345.678/0002-00',
      businessName: 'Empresa XYZ',
      fullName: 'Esidro da Silva',
      cpf: '98765432109',
      email: 'Esidro@example.com',
      password: 'senha123',
    };

    companyRepositoryMock.findOne.mockResolvedValueOnce(companyMock);

    const result = await service.findOne(companyId);
    expect(result).toEqual(companyMock);
    expect(companyRepositoryMock.findOne).toHaveBeenCalledWith({
      id: companyId,
    });
  });

  it('deve lançar NotFoundException ao tentar obter uma empresa inexistente pelo ID', async () => {
    const companyId = 999;
    companyRepositoryMock.findOne.mockResolvedValueOnce(undefined);

    await expect(service.findOne(companyId)).rejects.toThrowError(
      NotFoundException,
    );
    expect(companyRepositoryMock.findOne).toHaveBeenCalledWith({
      id: companyId,
    });
  });

  it('deve atualizar uma empresa', async () => {
    const companyId = 1;
    const updateCompanyDto: CreateCompanyDto = {
      cnpj: '12.345.678/0002-00',
      businessName: 'Empresa GG',
      fullName: 'Augusto Sabino',
      cpf: '123.456.789-09',
      email: 'augusto@gmail.com',
      password: 'novasenha123',
    };

    const companyMock = {
      id: companyId,
      ...updateCompanyDto,
    };

    companyRepositoryMock.findOne.mockResolvedValueOnce(companyMock);
    companyRepositoryMock.save.mockResolvedValueOnce(companyMock);

    const result = await service.update(companyId, updateCompanyDto);
    expect(result).toEqual(companyMock);
    expect(companyRepositoryMock.findOne).toHaveBeenCalledWith({
      id: companyId,
    });
    expect(companyRepositoryMock.save).toHaveBeenCalledWith({ ...companyMock });
  });

  it('deve remover uma empresa', async () => {
    const companyId = 1;
    const companyMock = {
      id: companyId,
      cnpj: ' 12.345.678/0002-00',
      businessName: 'Empresa XYZ',
      fullName: 'Esidro da Silva',
      cpf: '98765432109',
      email: 'Esidro@gmail.com',
      password: 'senha123',
    };

    companyRepositoryMock.findOne.mockResolvedValueOnce(companyMock);

    await service.remove(companyId);
    expect(companyRepositoryMock.findOne).toHaveBeenCalledWith({
      id: companyId,
    });
    expect(companyRepositoryMock.remove).toHaveBeenCalledWith(companyMock);
  });

  it('deve lançar NotFoundException ao tentar remover uma empresa inexistente', async () => {
    const companyId = 999;
    companyRepositoryMock.findOne.mockResolvedValueOnce(undefined);

    await expect(service.remove(companyId)).rejects.toThrowError(
      NotFoundException,
    );
    expect(companyRepositoryMock.findOne).toHaveBeenCalledWith({
      id: companyId,
    });
  });

  it('não deve permitir criar uma empresa com o mesmo CNPJ de outra empresa', async () => {
    const existingCompany = {
      id: 1,
      cnpj: ' 12.345.678/0002-00',
      businessName: 'Empresa XYZ',
      fullName: 'Esidro da Silva',
      cpf: '98765432109',
      email: 'Esidro@gmail.com',
      password: 'senha123',
    };

    companyRepositoryMock.findOne.mockResolvedValueOnce(existingCompany);

    const createCompanyDto: CreateCompanyDto = {
      cnpj: ' 12.345.678/0002-00',
      businessName: 'Empresa GG',
      fullName: 'Augusto Sabino',
      cpf: '123.456.789-09',
      email: 'augusto@gmail.com',
      password: 'novasenha123',
    };

    await expect(service.create(createCompanyDto)).rejects.toThrowError();
    expect(companyRepositoryMock.findOne).toHaveBeenCalledWith({
      cnpj: createCompanyDto.cnpj,
    });
  });
});
