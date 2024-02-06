import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { CreateDeveloperDto } from './dto/create-developer.dto';

@Controller('developers')
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Post()
  create(@Body() createDeveloperDto: CreateDeveloperDto) {
    return this.developersService.createDeveloper(createDeveloperDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.developersService.getDeveloperByID(id);
  }
}
