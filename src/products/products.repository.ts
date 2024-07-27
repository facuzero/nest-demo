import { Injectable } from '@nestjs/common';
import { Product } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
