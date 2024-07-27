import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './categories.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listar categorias' })
  getCategories() {
    return this.categoriesService.getCategories();
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Agregar categoria' })
  addCategory(@Body() category: Category) {
    return this.categoriesService.addCategories(category);
  }
}
