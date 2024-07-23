import { Injectable } from '@nestjs/common';
import { Category } from './categories.entity';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoryRepository: CategoriesRepository) {}
  getCategories() {
    return this.categoryRepository.getCategories();
  }
  addCategories(category: Category) {
    return this.categoryRepository.addCategories(category);
  }
  loadCategoriesData() {
    return this.categoryRepository.loadCategoriesData();
  }
}
