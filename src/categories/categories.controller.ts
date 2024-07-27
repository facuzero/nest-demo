import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './categories.entity';
import { ApiTags } from '@nestjs/swagger';
import { SeedService } from 'src/seeders/seed.service';
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly seederService: SeedService,
  ) {}
  @Get()
  getCategories() {
    return this.categoriesService.getCategories();
  }
  @Post()
  addCategory(@Body() category: Category) {
    return this.categoriesService.addCategories(category);
  }
  @Post('seeder')
  addSeeder() {
    return this.seederService.loadCategoriesData();
  }
}
