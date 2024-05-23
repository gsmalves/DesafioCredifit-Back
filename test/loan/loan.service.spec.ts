/* eslint-disable prettier/prettier */
import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Employee } from '../../src/employee/entities/employee.entity';
import { Loan } from '../../src/loan/entities/loan.entity';
import { LoanService } from '../../src/loan/loan.service';

jest.mock('axios');

describe('LoanService', () => {
  let service: LoanService;
  let loanRepository: Repository<Loan>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoanService,
        {
          provide: getRepositoryToken(Loan),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Employee),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<LoanService>(LoanService);
    loanRepository = module.get<Repository<Loan>>(getRepositoryToken(Loan));

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createLoan', () => {
    it('deve criar um novo empréstimo', async () => {
      const employeeId = 39;
      const amount = 7000;
      const installments = 2;
      const employee: Employee = {
        id: employeeId,
        fullName: 'Nome do Funcionário',
        cpf: '98765432109',
        email: 'funcionario@example.com',
        password: 'senha123',
        salary: 10000,
        companyId: 1,
        company: null,
        loans: [],
      };
  
      const newLoan: DeepPartial<Loan> = {
        id: 1,
        employeeId: employee.id,
        amount,
        installments,
        paymentStatus: 'paid',
        installmentAmount: 3500,
        firstInstallmentDate: new Date(),
        failureReason: '',
      };
  
      const mockLoanRepository = {
        save: jest.fn().mockResolvedValueOnce(newLoan as Loan),
      };
  
      const mockEmployeeRepository = {
        findOne: jest.fn().mockResolvedValueOnce(employee),
      };

      const loanService = new LoanService(
        mockLoanRepository as unknown as Repository<Loan>,
        mockEmployeeRepository as unknown as Repository<Employee>,
      );
  
      const result = await loanService.createLoan(employeeId, amount, installments);
  
      expect(result).toBeDefined();
      expect(result.employeeId).toBe(employeeId);
      expect(result.amount).toBe(amount);
      expect(result.installments).toBe(installments);
      expect(result.paymentStatus).toBe('paid');
    });
  });

  describe('getAllLoans', () => {
    it('deve buscar todos os empréstimos', async () => {
      const loans: Loan[] = [
        {
          id: 1,
          employeeId: 39,
          amount: 7000,
          installments: 2,
          paymentStatus: 'paid',
          employee: null,
          installmentsList: [],
          installmentAmount: 3500, 
          firstInstallmentDate: new Date('2024-05-25'), 
          failureReason: 'Margem', 
        },
        {
          id: 2,
          employeeId: 39,
          amount: 10000,
          installments: 3,
          paymentStatus: 'pending',
          employee: null,
          installmentsList: [],
          installmentAmount: 5000, 
          firstInstallmentDate: new Date('2024-06-01'), 
          failureReason: null, 
        },
      ];
      
      jest.spyOn(loanRepository, 'find').mockResolvedValueOnce(loans);
  
      const result = await service.getAllLoans();
  
      expect(result).toEqual(loans);
    });
  });

  describe('getLoanById', () => {
    it('deve retornar um empréstimo pelo ID', async () => {
      const loan: Loan = {
        
        id: 1,
        employeeId: 39,
        amount: 7000,
        installments: 2,
        paymentStatus: 'paid',
        employee: null,
        installmentsList: [],
        installmentAmount: 3500, 
        firstInstallmentDate: new Date('2024-05-25'), 
        failureReason: 'Margem', 
         
      };

      jest.spyOn(loanRepository, 'findOne').mockResolvedValueOnce(loan);

      const result = await service.getLoanById(1);

      expect(result).toEqual(loan);
    });

    it('deve retornar erro se o empréstimo não for encontrado', async () => {
      jest.spyOn(loanRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.getLoanById(1)).rejects.toThrow(HttpException);
    });
  });

  describe('getLoansByEmployeeId', () => {
    it('deve retornar uma lista de empréstimos por ID do funcionário', async () => {
      const loans: Loan[] = [
        {
            id: 1,
            employeeId: 39,
            amount: 7000,
            installments: 2,
            paymentStatus: 'paid',
            employee: null,
            installmentsList: [],
            installmentAmount: 3500, 
            firstInstallmentDate: new Date('2024-05-25'), 
            failureReason: 'Margem', 
        },
        {
            id: 2,
            employeeId: 39,
            amount: 10000,
            installments: 3,
            paymentStatus: 'pending',
            employee: null,
            installmentsList: [],
            installmentAmount: 5000, 
            firstInstallmentDate: new Date('2024-06-01'), 
            failureReason: null, 
        },
      ];

      jest.spyOn(loanRepository, 'find').mockResolvedValueOnce(loans);

      const result = await service.getLoansByEmployeeId(39);

      expect(result).toEqual(loans);
    });
  });

  describe('deleteLoan', () => {
    it('deve deletar um empréstimo pelo ID', async () => {
      const loan: Loan = {
        id: 2,
        employeeId: 39,
        amount: 10000,
        installments: 3,
        paymentStatus: 'pending',
        employee: null,
        installmentsList: [],
        installmentAmount: 5000, 
        firstInstallmentDate: new Date('2024-06-01'), 
        failureReason: null,
      };

      jest.spyOn(loanRepository, 'findOne').mockResolvedValueOnce(loan);
      jest.spyOn(loanRepository, 'remove').mockResolvedValueOnce(loan);

      await service.deleteLoan(1);

      expect(loanRepository.remove).toHaveBeenCalledWith(loan);
    });

    it('deve retornar erro se o empréstimo não for encontrado', async () => {
      jest.spyOn(loanRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.deleteLoan(1)).rejects.toThrow(HttpException);
    });
  });



    it('deve retornar erro se o empréstimo não for encontrado', async () => {
      jest.spyOn(loanRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.updateLoan(1, {})).rejects.toThrow(HttpException);
    });

});
