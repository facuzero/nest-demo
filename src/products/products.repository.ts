import { Injectable } from '@nestjs/common';
import { Product } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Category } from 'src/categories/categories.entity';
@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async getProducts() {
    return this.productRepository.find();
  }
  async getProductById(id: string) {
    return this.productRepository.findOne({ where: { id } });
  }
  async createProducts(product: Product) {
    this.productRepository.create(product);
    return product;
  }
  async editProductById(id: string, fields: Product) {
    return this.productRepository.update(id, fields);
  }
  async deleteProducts(id: string) {
    return this.productRepository.delete(id);
  }

  async loadProdcutsData() {
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
      const category = await this.categoryRepository.findOne({
        where: { name: item.category },
      });
      let product = await this.productRepository.findOne({
        where: { name: item.name },
      });
      if (!product) {
        product = this.productRepository.create({
          name: item.name,
          description: item.description,
          price: item.price,
          stock: item.stock,
          category: category,
        });
      }
      await this.productRepository.save(product);
    }
  }
}
