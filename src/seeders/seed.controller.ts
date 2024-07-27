import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seeder')
export class SeedController {
  constructor(private readonly seederService: SeedService) {}

  @Post('categories')
  addCategories() {
    return this.seederService.loadCategoriesData();
  }

  @Post('products')
  @HttpCode(HttpStatus.CREATED)
  addProducts() {
    return this.seederService.loadProductsData();
  }
}
