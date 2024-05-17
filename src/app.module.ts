/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from './company/company.module';
import { Company } from './company/entities/company.entity';
import { EmployeeModule } from './employee/employee.module';
import { Employee } from './employee/entities/employee.entity';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { LoanModule } from './loan/loan.module';
import { InstallmentModule } from './installment/installment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'admin2024@',
      username: 'postgres',
      entities: [User, Company, Employee],
      database: 'postgres',
      synchronize: true,
      logging: true,
      }),
    UserModule,
    CompanyModule,
    EmployeeModule,
    LoanModule,
    InstallmentModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}