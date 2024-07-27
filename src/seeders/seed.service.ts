import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/products/products.entity';
import { Category } from 'src/categories/categories.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  filePath = path.join(__dirname, '..', '..', 'src', 'data', 'preCarga.json');
  data = JSON.parse(fs.readFileSync(this.filePath, 'utf8'));

  async loadCategoriesData() {
    for (const item of this.data) {
      let category = await this.categoryRepository.findOne({
        where: { name: item.category },
      });
      if (!category) {
        category = this.categoryRepository.create({ name: item.category });
        await this.categoryRepository.save(category);
      }
    }
    return { message: 'Categorías agregadas' };
  }
  async loadProductsData() {
    for (const item of this.data) {
      const category = await this.categoryRepository.findOne({
        where: { name: item.category },
      });
      if (!category) {
        throw new Error(`Categoría ${item.category} no encontrada`);
      }
      const haveNameProduct = await this.productRepository.findOne({
        where: { name: item.name },
      });
      if (haveNameProduct) {
        haveNameProduct.stock += item.stock;
        await this.productRepository.save(haveNameProduct);
      } else {
        const product = this.productRepository.create({
          name: item.name,
          description: item.description,
          price: item.price,
          stock: item.stock,
          category,
        });
        await this.productRepository.save(product);
      }
    }
    return { message: 'Productos agregados' };
  }
  async onModuleInit() {
    await this.loadCategoriesData();
    await this.loadProductsData();
  }
}
