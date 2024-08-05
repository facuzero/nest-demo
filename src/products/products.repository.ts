import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../categories/categories.entity';
import { CreateProductDto, UpdateProductDto } from './products.dto';
@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async getProducts() {
    const products = await this.productRepository.find({
      relations: ['category'], //Actualizado!: Corresponde al nombre de la columna, dentro de la entidad products, con la que tiene relacion
    });

    return products.map((product) => ({
      ...product,
      category: product.category.name,
    }));
  }
  async getProductById(id: string) {
    return this.productRepository.findOne({ where: { id } });
  }
  async createProducts(product: CreateProductDto) {
    const {
      name,
      description,
      price,
      stock,
      imgUrl,
      category: categoryId,
    } = product;
    try {
      const category = await this.categoryRepository.findOne({
        where: { name: categoryId },
      });
      if (!category)
        throw new NotFoundException(
          `No se encontró la categoria en la base de datos con el nombre '${categoryId}'`,
        );
      const productoDB = await this.productRepository.findOne({
        where: { name },
      });
      if (productoDB)
        throw new BadRequestException(
          `Producto con el nombre '${name}' ya agregado, utiliza otro nombre`,
        );
      const newProduct = await this.productRepository.create({
        name,
        description,
        price,
        stock,
        imgUrl,
        category,
      });
      await this.productRepository.save(newProduct);
      return {
        message: 'Producto agregado',
        product,
      };
    } catch (error) {
      throw error;
    }
  }
  async editProductById(id: string, fields: UpdateProductDto) {
    const product = await this.getProductById(id);
    try {
      await this.productRepository.update(product.id, {
        description: fields.description,
        imgUrl: fields.imgUrl,
        name: fields.name,
        price: fields.price,
        stock: fields.stock,
      });
    } catch (error) {
      throw new NotFoundException('Producto no encontrado');
    }
    return {
      message: 'Producto editado',
      product: fields,
    };
  }
  async deleteProducts(id: string) {
    await this.productRepository.delete(id);
    return { message: 'Producto eliminado ' };
  }
}
