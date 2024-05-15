/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity'

import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'admin2024@',
      username: 'postgres',
      entities: [User],
      database: 'postgres',
      synchronize: true,
      logging: true,
      }),
    UserModule,
    CompanyModule,
    EmployeeModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}