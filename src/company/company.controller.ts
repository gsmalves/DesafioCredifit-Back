/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova empresa' })
  @ApiResponse({ status: 201, description: 'A empresa foi criada com sucesso.', type: Company })
  create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obter todas as empresas' })
  @ApiResponse({ status: 200, description: 'Lista de todas as empresas retornada com sucesso.', type: [Company] })
  findAll(): Promise<Company[]> {
    return this.companyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma empresa pelo ID' })
  @ApiResponse({ status: 200, description: 'Empresa encontrada com sucesso.', type: Company })
  findOne(@Param('id') id: string): Promise<Company> {
    return this.companyService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma empresa' })
  @ApiResponse({ status: 200, description: 'A empresa foi atualizada com sucesso.', type: Company })
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir uma empresa' })
  @ApiResponse({ status: 200, description: 'A empresa foi excluída com sucesso.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.companyService.remove(+id);
  }
}
