import { Injectable } from '@nestjs/common';
import { Category } from './categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async getCategories() {
    return this.categoryRepository.find();
  }
  async addCategories(category: Category) {
    this.categoryRepository.create(category);
    return category;
  }
}
