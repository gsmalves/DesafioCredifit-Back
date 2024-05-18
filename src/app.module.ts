/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from './company/company.module';
import { Company } from './company/entities/company.entity';
import { EmployeeModule } from './employee/employee.module';
import { Employee } from './employee/entities/employee.entity';
// import { Installment } from './installment/entities/installment.entity';
// import { InstallmentModule } from './installment/installment.module';
import { Loan } from './loan/entities/loan.entity';
import { LoanModule } from './loan/loan.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'admin2024@',
      username: 'postgres',
      entities: [ Company, Employee,Loan, ],
      database: 'postgres',
      synchronize: true,
      logging: true,
      }),

    CompanyModule,
    EmployeeModule,
    LoanModule,
   

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}