import { Injectable } from '@nestjs/common';
import { OrderRepository } from './orders.repsitory';
import { Product } from 'src/products/products.entity';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrderRepository) {}
  addOrder(id: string, products: Product[]) {
    return this.ordersRepository.addOrder(id, products);
  }
  getOrder(id: string) {
    return this.ordersRepository.getOrder(id);
  }
}
