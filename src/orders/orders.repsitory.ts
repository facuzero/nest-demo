import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/users.entity';
import { OrderDetail } from 'src/orderDetail/orderDetails.entity';
import { Product } from 'src/products/products.entity';
import { CreateOrderDto } from './order.dto';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async addOrder(orderDto: CreateOrderDto) {
    const { userId, products } = orderDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(
        `No se encontró el usuario con el id ${userId}`,
      );
    }
    const order = new Order();
    order.date = new Date();
    order.user = user;
    const newOrder = await this.orderRepository.save(order);

    let total = 0;
    const productsArray = await Promise.all(
      products.map(async ({ id }) => {
        const product = await this.productRepository.findOneBy({
          id,
        });
        if (!product) {
          throw new NotFoundException(`Producto con id ${id} no encontrado`);
        }
        if (product.stock <= 0) {
          throw new ConflictException(
            `Producto con id ${id} no tiene stock suficiente`,
          );
        }
        total += Number(product.price);
        await this.productRepository.update(
          { id: product.id },
          { stock: product.stock - 1 },
        );
        return product;
      }),
    );
    const orderDetail = new OrderDetail();
    orderDetail.total = Number(total.toFixed(2));
    orderDetail.order = newOrder;
    orderDetail.products = productsArray;
    const newOrderDetail = await this.orderDetailRepository.save(orderDetail);

    newOrder.orderDetail = [newOrderDetail];
    await this.orderRepository.save(newOrder);

    return await this.orderDetailRepository.find({
      where: { id: newOrderDetail.id },
      relations: ['order', 'products'], // hace referencia a  las propiedades de ordenDetails.entity
    });
  }
  async getOrder(id: string) {
    const order = await this.orderDetailRepository /* .findOne({
      where: { id },
      relations: {
        order: {
          user: true,
        },
        products: true,
      },
    }); */
      .createQueryBuilder('orderDetails')
      .leftJoinAndSelect('orderDetails.order', 'orders')
      .leftJoinAndSelect('orderDetails.products', 'products')
      .leftJoinAndSelect('orders.user', 'users')
      //.addSelect(['users.email']) // Selecciona solo el campo 'email' del usuario
      .where('orderDetails.id = :id', { id })
      .getOne();
    if (!order) {
      throw new NotFoundException(`Orden con id ${id} no encontrada`);
    }
    return order;
  }
}
