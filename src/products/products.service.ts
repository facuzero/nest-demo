import { Injectable } from '@nestjs/common';
import { ProductRepository } from './products.repository';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductRepository) {}
  getProducts() {
    return this.productsRepository.getProducts();
  }
  createProduct(product: Product) {
    return this.productsRepository.createProducts(product);
  }
  getProductById(id: string) {
    return this.productsRepository.getProductById(id);
  }
  editProductId(id: string, fields: Product) {
    return this.productsRepository.editProductById(id, fields);
  }
  deleteProductById(id: string) {
    return this.productsRepository.deleteProducts(id);
  }
}
