import { Injectable } from '@nestjs/common';
import { ProductRepository } from './products.repository';
import { CreateProductDto, UpdateProductDto } from './products.dto';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductRepository) {}
  getProducts() {
    return this.productsRepository.getProducts();
  }
  createProduct(product: CreateProductDto) {
    return this.productsRepository.createProducts(product);
  }
  getProductById(id: string) {
    return this.productsRepository.getProductById(id);
  }
  editProductId(id: string, fields: UpdateProductDto) {
    return this.productsRepository.editProductById(id, fields);
  }
  deleteProductById(id: string) {
    return this.productsRepository.deleteProducts(id);
  }
}
