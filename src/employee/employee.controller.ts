/* eslint-disable prettier/prettier */

import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';

@ApiTags('employees')
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new employee' })
  @ApiBody({ type: CreateEmployeeDto }) // Define o tipo esperado no corpo da requisição
  @ApiResponse({ status: 201, description: 'The employee has been successfully created.', type: Employee })
  create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all employees' })
  @ApiResponse({ status: 200, description: 'List of all employees returned successfully.', type: [Employee] })
  findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an employee by ID' })
  @ApiResponse({ status: 200, description: 'Employee found successfully.', type: Employee })
  findOne(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.findOneById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an employee' })
  @ApiBody({ type: UpdateEmployeeDto }) // Define o tipo esperado no corpo da requisição
  @ApiResponse({ status: 200, description: 'The employee has been successfully updated.', type: Employee })
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an employee' })
  @ApiResponse({ status: 200, description: 'The employee has been successfully deleted.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.employeeService.remove(+id);
  }
}

