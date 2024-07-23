import { Injectable } from '@nestjs/common';
import { Category } from './categories.entity';
import * as fs from 'fs';
import * as path from 'path';
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

  async loadCategoriesData() {
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      'src',
      'data',
      'preCarga.json',
    );
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    for (const item of data) {
      let category = await this.categoryRepository.findOne({
        where: { name: item.category },
      });
      if (!category) {
        category = this.categoryRepository.create({ name: item.category });
        await this.categoryRepository.save(category);
      }
    }
  }
}
