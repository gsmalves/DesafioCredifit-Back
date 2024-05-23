/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from '../../src/company/company.controller';
import { CompanyService } from '../../src/company/company.service';
import { CreateCompanyDto } from '../../src/company/dto/create-company.dto';
import { UpdateCompanyDto } from '../../src/company/dto/update-company.dto';
import { Company } from '../../src/company/entities/company.entity';

describe('CompanyController', () => {
  let controller: CompanyController;
  let service: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [CompanyService],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
    service = module.get<CompanyService>(CompanyService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('deve criar uma nova empresa', async () => {
      const createCompanyDto: CreateCompanyDto = {
        cnpj: '12.345.678/0002-00',
        businessName: 'Empresa XYZ',
        fullName: 'Esidro da Silva',
        cpf: '98765432109',
        email: 'Esidro@example.com',
        password: 'senha123',
      };
  
      const empresaCriada: Company = {
        id: 1,
        employees: [], 
        ...createCompanyDto,
      };
  
      jest.spyOn(service, 'create').mockResolvedValueOnce(empresaCriada);
  
      const resultado = await controller.create(createCompanyDto);
      expect(resultado).toEqual(empresaCriada);
    });
  });
  

  describe('findAll', () => {
    it('deve retornar um array vazio quando não há empresas', async () => {
      const empresas: Company[] = []; 
  
      jest.spyOn(service, 'findAll').mockResolvedValueOnce(empresas);
  
      const resultado = await controller.findAll();
      expect(resultado).toEqual(empresas);
    });
  });
  

  describe('findOne', () => {
    it('deve retornar uma empresa pelo ID', async () => {
      const id = '1';
      const empresa: Company = {
        id: 1,
        cnpj: '12.345.678/0002-00',
        businessName: 'Empresa XYZ',
        fullName: 'Esidro da Silva',
        cpf: '98765432109',
        email: 'Esidro@example.com',
        password: 'senha123',
        employees: []
      };

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(empresa);

      const resultado = await controller.findOne(id);
      expect(resultado).toEqual(empresa);
    });
  });


  describe('update', () => {
    it('deve atualizar uma empresa', async () => {
      const id = '1';
      const updateCompanyDto: UpdateCompanyDto = {
        businessName: 'Barbada Ferragem',
        cnpj: '12.345.678/0002-00',
        fullName: 'Esidro da Silva',
        cpf: '98765432109',
        email: 'Esidro@example.com',
        password: 'senha123',

      };
  
      const empresaAtualizada: Company = {
        id: 1,
        employees: [], // Adicionando um array vazio de funcionários
        ...updateCompanyDto,
      };
  
      jest.spyOn(service, 'update').mockResolvedValueOnce(empresaAtualizada);
  
      const resultado = await controller.update(id, updateCompanyDto);
      expect(resultado).toEqual(empresaAtualizada);
    });
  });

  describe('remove', () => {
    it('deve excluir uma empresa', async () => {
      const id = '1';

      jest.spyOn(service, 'remove').mockResolvedValueOnce();

      const resultado = await controller.remove(id);
      expect(resultado).toBeUndefined();
    });
  });
});
