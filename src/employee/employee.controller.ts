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
  @ApiOperation({ summary: 'Criar um novo funcionário' })
  @ApiBody({ type: CreateEmployeeDto }) 
  @ApiResponse({ status: 201, description: 'O funcionário foi criado com sucesso.', type: Employee })
  create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todos os funcionários' })
  @ApiResponse({ status: 200, description: 'Lista de todos os funcionários retornada com sucesso.', type: [Employee] })
  findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um funcionário pelo ID' })
  @ApiResponse({ status: 200, description: 'Funcionário encontrado com sucesso.', type: Employee })
  findOne(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.findOneById(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um funcionário' })
  @ApiBody({ type: UpdateEmployeeDto }) 
  @ApiResponse({ status: 200, description: 'O funcionário foi atualizado com sucesso.', type: Employee })
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir um funcionário' })
  @ApiResponse({ status: 200, description: 'O funcionário foi excluído com sucesso.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.employeeService.remove(+id);
  }
}
