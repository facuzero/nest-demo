import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/products/products.entity';
import { Category } from 'src/categories/categories.entity';
import * as fs from 'fs';
import * as path from 'path';
import { Order } from 'src/orders/orders.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
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
      const hasProductName = await this.productRepository.findOne({
        where: { name: item.name },
      });
      if (hasProductName) {
        hasProductName.stock += item.stock;
        await this.productRepository.save(hasProductName);
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

  async resetData() {
    const hasOrders = await this.checkOrders();
    if (hasOrders) {
      return {
        message:
          'No se puede reiniciar datos, hay productos en pedidos existentes',
      };
    }
    await this.productRepository.delete({}); // Eliminar todos los registros de productos
    await this.loadProductsData();
    return { message: 'Datos reiniciados exitosamente' };
  }
  async checkOrders() {
    const orders = await this.orderRepository.count();
    return orders > 0;
  }

  async onModuleInit() {
    await this.loadCategoriesData();
    await this.loadProductsData();
  }
}
